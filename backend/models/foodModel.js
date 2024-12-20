import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    image : {
        type : String,
        required:true
        
    },

  price : {
        type : Number,
        defualt : null,
        required:true
    },
    discount : {
        type : Number,
        default : null,
        
    },
    description : {
        type : String,
        default : "",
        required:true
    },
    category : {
        type : String,
        default : "",
        required:true
    },
    more_details : {
        type : Object,
        default : {}
    },
    featured : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

//create a text index
// foodSchema.index({
//     name  : "text",
//     description : 'text'
// },{
//     name : 10,
//     description : 5
// })


const foodModel = mongoose.models.food || mongoose.model('food',foodSchema)

export default foodModel