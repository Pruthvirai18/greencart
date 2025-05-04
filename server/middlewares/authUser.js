// import jwt from 'jsonwebtoken';

// const authUser=async (req,res,next)=>{
//     const {token}=req.cookies;
//     if(!token){
//         return res.json({success:false,message:'Not Authorized'});

//     }
//     try{
//         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET)
//         if(tokenDecode.id){
//             req.userId = tokenDecode.id; // ✅ Safe for all HTTP methods

//         }
//         else{
//             return res.json({success:false,message:'Not Authorized'});

//         }
//         next();

//     }
//     catch(error){
//         return res.json({success:false,message:error.message});


//     }

// }

// export default authUser;


import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(tokenDecode.id); // fetch full user
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        req.userId = user._id;      // ✅ Required for your isAuth controller
        req.user = user;            // optional
        next();
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;
