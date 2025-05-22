const status = require("http-status")
const FundRaising = require("../models/FundRaisingModel")
const fundRaisingTransaction = require("../models/FundRaisingTransaction")
const response = require("../utils/response")
const createTransaction = async (req, res) => {
    try {
        const { donorId, fundRaisingId, amount, message } = req.body
        const fundRaising = await FundRaising.findById(fundRaisingId)
        console.log(fundRaising)
        if (!fundRaising) {
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND, "Fundraising not found"))
        }
        fundRaising.raisedAmount += amount
        const result = await fundRaising.save()
        const transaction = new fundRaisingTransaction({
            donorId,
            fundRaisingId,
            amount,
            message
        });

        await transaction.save()

        res.status(status.status.CREATED).send(response.createSuccessResponse(status.status.CREATED, "Transaction created Successfully", result))
    } catch (error) {

        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during transaction", error))
    }
}
// const getAllFundraisingTransaction = async (req, res) => {
//     try {

//         const result = await fundRaisingTransaction.find().populate("donorId").populate("fundRaisingId");
//         res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
//     } catch (error) {
//         res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all Fundraising Transaction data", error))
//     }
// }

module.exports = { createTransaction}