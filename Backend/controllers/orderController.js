
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import Stripe from 'stripe'

// global variable
const currency ='inr'
const deliveryCharge =10
// Gateway For pay strip
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing order using cod
const placeOrder = async (req,res) =>{
    try {
       const {userId,items,amount,address} =req.body
       const orderData ={
        userId,
        items,
        address,
        amount,
        paymentMethod:"COD",
        payment:false,
        date:Date.now()
       }
      
       const newOrder =new orderModel(orderData)
       await newOrder.save();
       
       await userModel.findByIdAndUpdate(userId,{cartData:{}})
       
       res.json({
        success:true,message:"Order Placed"
       })
    } catch (error){
        res.json({
            success:false,
            message:error.message
        })
    }
}

// placing order using stripe
const placeOrderStripe = async (req,res) =>{
    try {
         const {userId,items,amount,address} =req.body;
         const {origin} =req.headers;
         const orderData ={
        userId,
        items,
        address,
        amount,
        paymentMethod:"Stripe",
        payment:false,
        date:Date.now()
       }
           const newOrder =new orderModel(orderData)
       await newOrder.save();

       const line_items =items.map((item)=>({
        price_data:{
            currency:currency,
            product_data : {
                name : item.name
,            },
                unit_amount:item.price*100
        },
        quantity:item.quantity
       }))

       line_items.push({
        price_data:{
            currency:currency,
            product_data : {
                name : "Delivery Charges"
,            },
                unit_amount:deliveryCharge*100
        },
        quantity:1
       })

       const session =await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment'
       })
       res.json({
        success:true,
        session_url:session.url
       })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


const verifyStripe = async (req, res) => {
  const { orderId, success,userId } = req.body;
  
  try {
    if (!orderId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing orderId or userId"
      });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

   
    if (order.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access to order"
      });
    }

    if (success === "true") {
    
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId, 
        { 
          payment: true,
          status: "paid",
          paymentDate: new Date() 
        },
        { new: true }
      );

      // Clear user's cart
      await userModel.findByIdAndUpdate(
        userId, 
        { $set: { cartData: {} } }
      );

      return res.json({ 
        success: true,
        message: "Payment verified successfully"
      });
    } else {
      // Payment failed - delete the order
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ 
        success: false,
        message: "Payment failed - order cancelled"
      });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};



// All order data for admin panel

const allOrders = async (req,res) =>{
    try {
        const orders =await orderModel.find({})
        res.json({success:true,orders})
        
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}

// User Order Data for Frontend 
const userOrders =async (req,res)=>{

    try {
        const {userId} =req.body;
        const  orders =await orderModel.find({userId})
        res.json({
            success:true,
            orders
        })
    } catch (error) {
         res.json({
            success:true,
            message:error.message
        })
    }
}

// Update order status from admin panel
const updateStatus =async (req,res)=>{
    try {
        const  {orderId,status}=req.body;

        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({
            success:true,
            message:"Status Updated"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })  
    }
}

export {verifyStripe,placeOrder,placeOrderStripe,allOrders,userOrders,updateStatus}