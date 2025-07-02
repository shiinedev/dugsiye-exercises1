export const authorize = (...roles) =>{

   return (req,res,next) =>{
     if(!roles.includes(req.user.role)){
       return res.status(401).json(`Access denied:Required one of [${roles.join(",")}]`);
    }
    next()

   }
}