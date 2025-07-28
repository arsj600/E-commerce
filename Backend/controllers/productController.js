import { v2 as cloudinary } from 'cloudinary';

import dotenv from 'dotenv';
import productModel from '../models/productModel.js';
dotenv.config();

// function for add product

const addProduct = async (req,res) =>{
    try {
       const {name,description,price,category,subCategory,size,bestseller} =req.body; 
        
       const image1=req.files.image1 && req.files.image1[0];
       const image2=req.files.image2 && req.files.image2[0];
       const image3=req.files.image3 && req.files.image3[0];
       const image4=req.files.image4 && req.files.image4[0];


       const images =[image1,image2,image3,image4].filter((item)=> item!=undefined);
       
       let imagesURL =await Promise.all(
        images.map(async (item) =>{
            let result =await cloudinary.uploader.upload(item.path,{resource_type:'image'}) 
            return result.secure_url
        })
       )
        
       const productData ={
        name,
        description,
        category,
        price:Number(price),
        subCategory,
        bestseller:bestseller ==="true"? true : false,
        size:JSON.parse(size),
        image:imagesURL,
        date:Date.now()
       }

       const product =new productModel(productData);
       await product.save();

       


       res.json({
        success:true,
        message:"success product added"

       })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
}


// function to list product
const listProduct = async (req,res) =>{
    try {
        const product =await productModel.find({})
            res.json({
                success:true,
                product
            })

    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }

}


// function to remove product

    const removeProduct =async (req,res) =>{
        try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({
            success:true,
                message:"Product removed"
        })
    }
    catch(error){
         res.json({
            success:false,
            message:error.message
        })
    }
    }


// function for single product info
const singleProduct =async (req,res)=>{
    try {
        const {productId}=req.body;
        const product=await productModel.findById(productId);
    res.json({
                success:true,
                product
            })
    } catch (error) {
         res.json({
            success:false,
            message:error.message
        })
    }
}

export {listProduct,addProduct,removeProduct,singleProduct}