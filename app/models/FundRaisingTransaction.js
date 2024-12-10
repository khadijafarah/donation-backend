const mongoose = require ("mongoose")
const fundRaisingTransactionSchema = new mongoose.Schema ({
    donorId:{type:mongoose.Schema.Types.ObjectId, ref:"User" , required:true},
    fundRaisingId:{type:mongoose.Schema.Types.ObjectId, ref:"FundRaising" , required:true},
    amount: {type:Number, required:true},
    message: {type:String}

}, {timestamps: true})

const fundRaisingTransaction = mongoose.model("FundRaisingTransaction", fundRaisingTransactionSchema)
module.exports = fundRaisingTransaction 
