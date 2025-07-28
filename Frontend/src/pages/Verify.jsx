import axios from "axios"
import { useEffect } from "react"
import { useContext } from "react"
import { useSearchParams,useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ShopContext } from "../context/ShopContext"

const Verify = () => {
    const {token,setCartItems,backendUrl}=useContext(ShopContext)
     const navigate = useNavigate()
    const [searchParams,setSearchParams]=useSearchParams()

    const success =searchParams.get("success")
    const orderId =searchParams.get("orderId")

    const verifyPayment =async ()=>{
        try {
            if(!token){
            
                return null;
            }
            const userId =  localStorage.getItem('userId')

            const response =await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId,userId},{headers:{token}})
            
            if(response.data.success){
                setCartItems({})
                toast.success("Payment verified successfully!");
                setTimeout(() => {
                navigate('/orders')
                }, 1000)
                
            }else{
                toast.error("Payment verification failed");
                setTimeout(() => {
                     navigate('/cart')
                     }, 1000)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])

    return (
    <div>
         <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Processing Payment...</h1>
                <p>Please wait while we verify your payment</p>
            </div>
        </div>
    </div>
  )
}

export default Verify