import jwt from "jsonwebtoken"
import UserModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import validator from 'validator'

//login user

export const loginUser = async (req,res)=> {
    
    try {

        const {email,password}=req.body;


        if(!email||!password){
            return res.status(400).json({
                message:"Please Provid Email and Password",
                error:true,
                success:false
            })
        }

        const user = await UserModel.findOne({email});


        if (!user){

            return res.status(400).json({
                message:"This Email is not registerd",
                error:true,
                success:false
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)


        if (!isMatch){

            return res.status(400).json({
                message:"Incorrect Password",
                error:true,
                success:false
            })
        }

        // if (user.password!==password){

        //     return response.status(400).json({
        //         message:"Incorrect Password",
        //         error:true,
        //         success:false
        //     })
        // }

        const token = createToken(user._id)

        const updateUser = await UserModel.findByIdAndUpdate(user?._id,{
            last_login_date : new Date()
        })

        return res.json({
            message : "Login successfully",
            error : false,
            success : true,
            data : token,
                
            
        })
    
    } catch (error) {
        res.status(500).json({

            message : error.message || error,
            error : true,
            success : false
        })
    }
}



const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user

export const registerUser= async(req,res) =>{
    try {
        const {email,name,password}=req.body;

        if(!name||!email||!password){
            return res.status(400).json({
                message:"Please Provide Name,Email and Password",
                error:true,
                success:false
            })
        }

        const exists = await UserModel.findOne({email});
        if (exists){

            return res.status(400).json({
                message:"This Email is already registerd",
                error:true,
                success:false
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt);

        const payload={
            name,
            email,
            password:hashedPassword
            // password
        }

        const newUser=new UserModel(payload);
        const user = await newUser.save();
        const token=createToken(user._id)

        
        return res.status(200).json({
            message:"User regesterd successfully",
            error:false,
            success:true,
            data:token
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
};