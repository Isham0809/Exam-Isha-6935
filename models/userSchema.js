const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    email:{type:String,require:true},
    roles: { type: [String], required: true },
}, {
    timestamps: true
})
const user = mongoose.model("userTbl", userSchema)

module.exports = user