const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    description:String,
    image:String,
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categoryTbl"
    },
},{
    timestamps:true
})

const product = mongoose.model("productTbl",productSchema)

module.exports = product