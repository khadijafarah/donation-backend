const mongoose = require ("mongoose")
const donationTransactionSchema = new mongoose.Schema ({
    donorId:{type:mongoose.Schema.Types.ObjectId, ref:"User" , required:true},
    donationId:{type:mongoose.Schema.Types.ObjectId, ref:"Donation" , required:true},
    message: {type:String}

}, {timestamps: true})

const donationTransaction = mongoose.model("DonationTransactionModel",donationTransactionSchema )
module.exports = donationTransaction 
