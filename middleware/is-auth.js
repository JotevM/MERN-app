const config=require("config")
const jwt=require("jsonwebtoken")
const isAuth=(req,res,next)=>{
    const header=req.get("Authorization")
    if(!header){
        req.isAuth=false
        return next()
    }
    const token=header.split(" ")[1]
    if(!token){
        req.isAuth=false
        return next()
    }
    let decoded
    try{ 
     decoded=jwt.verify(token, config.get("secretKey"))
    }
    catch( err){
        
    req.isAuth=false
    return next()
    }
  
   if(!decoded) {
    req.isAuth=false
    return next()
   }
   if(decoded.exp< Math.floor(new Date().getTime()/1000)){
       req.isAuth=false
       return next()
   }
   req.isAuth=true
   req.role=decoded.role
   next()
}
module.exports=isAuth ////// verifyJWT