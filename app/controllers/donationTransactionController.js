const status = require("http-status")
const Donation = require ("../models/DonationModel")
const donationTransactions = require("../models/DonationTransactionModel")
const response = require ("../utils/response")
const createDonationTransaction = async (req,res) =>{
    try {
    const {donorId, donationId,message} = req.body
    const donations = await Donation.findById(donationId)
    console.log(donations)
    if(!donations){
        return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND,"Fundraising not found" ))
    } 
   
    
    const donationTransaction = new donationTransactions({
        donorId,
        donationId,
        message
    });
   
    await donationTransaction.save()
    const result = await donations.save()
    
    res.status(status.status.CREATED).send(response.createSuccessResponse(status.status.CREATED, "Donation Transaction created Successfully", result))
    } catch (error) {

        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during donation transaction",error))
    }
}

module.exports = {createDonationTransaction}