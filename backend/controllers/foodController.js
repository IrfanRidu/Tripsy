import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food


export const addFood= async (req,res)=>{
let image_filename=`${req.file.filename}`;

const food=new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename
})

try {
    await food.save();
    res.json({success:true,message:"Food Item added successfully"})
    
} catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"add food Error"})
}

}


//all food list

export const listFood= async (req,res)=>{
try {
    const foods= await foodModel.find({});
    res.json({success:true,data:foods,message:"All food items"})
} catch (error) {
    console.log(error)
    res.status(500).json({success:false,message:"List food Error"})
}
}


//remove food

export const removeFood= async (req,res)=>{
    try {
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food?.image}`,()=>{})
          await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Item removed"})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:" food remove Error"})
    }
    }
