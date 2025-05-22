const status = require("http-status")
const response = require("../utils/response")
const donationTransaction = require("../models/DonationTransactionModel");
const fundRaisingTransaction = require("../models/FundRaisingTransaction");

const allTransaction = async (req, res) => {
    try {
        const allDonationTransaction = await donationTransaction.find()
        .populate("donorId","userName email").populate("donationId","title amount category");
        const allFundraisingTransaction = await fundRaisingTransaction.find()
        .populate("donorId", "userName email").populate("fundRaisingId", "title amount category");
        const result = [...allDonationTransaction, ...allFundraisingTransaction]
        res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all Donation Transaction data", error))

    }
}

const getTransactionById = async (req,res)=>{
    try {
        const {id} =req.params;
        console.log(id)
        const donationTransactionById = await donationTransaction.find({donorId:id})
        .populate("donorId","userName email").populate("donationId","title amount category");
        const fundraisingTransactionById = await fundRaisingTransaction.find({donorId:id})
        .populate("donorId", "userName email").populate("fundRaisingId", "title amount category");
        const result = [...donationTransactionById, ...fundraisingTransactionById]
        res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all Donation Transaction data", error))

    }
}
module.exports = {allTransaction,getTransactionById }