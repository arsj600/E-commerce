import jwt from "jsonwebtoken"

const adminAuth =async (req,res,next) =>{
    try{
        const {token}=req.headers
        if(!token){
            return res.json({
                success:false,
                message:"Not Authorised to login Again"
            })
        }
        const token_decode=jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !=process.env.ADMIN_EMAIL +process.env.ADMIN_PASSWORD){
             return res.json({
                success:false,
                message:"Not Authorised to login Again"
            })
        }
        next();
    }
     catch(error){
 return res.json({
                success:false,
                message:error.message
            })
     }
}
export default adminAuth