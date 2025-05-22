const status = require("http-status")
const FundRaising = require("../models/FundRaisingModel")
const response = require("../utils/response")

const createFund = async (req, res) => {
    try {
        const newFund = new FundRaising(req.body)
        const result = await newFund.save()
        res.status(status.status.CREATED).send(response.createSuccessResponse(status.status.CREATED, "New fund Raising created Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during creation of New Fund Raising", error))

    }
}

const getAllFundraiser = async (req, res) => {
    const { search,sort } = req.query
    let filter = {}
    //here regex is used to remove case sensitive
    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }
    let sortingCategory = {}
    if (sort === "HighToLow") {
        sortingCategory.raisedAmount = -1
    }
    if (sort === "LowToHigh") {
        sortingCategory.raisedAmount = 1
    }
    console.log(search);
    try {
        const result = await FundRaising.find(filter).sort(sortingCategory)
        res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all Fundraising data", error))
    }
}

const getSingleFundraiserById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const result = await FundRaising.findById(id)
        if (!result) {
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND, "Fundraiser not found"))
        }
        if (result) {
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Single Fundraiser Data retrieved Successfully", result))
        }
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving a data", error))
    }
}
const updateSingleFundraiser = async (req, res) => {
    try {
        const { id } = req.params
        const updatedData = req.body
        const result = await FundRaising.findByIdAndUpdate(id, updatedData, { new: true })
        if (!result) {
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND, "Error occured while updating"))
        }
        if (result) {
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Fundraiser updated Successfully", result))
        }
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "Error occured during updating the data", error))
    }
}
const deleteFundraiser = async (req, res) => {
    try {
        const { id } = req.params
        const result = await FundRaising.findByIdAndDelete(id)
        if (!result) {
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND, "Fundraiser Not Found"))
        }
        if (result) {
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Fundraiser deleted Successfully", result))
        }

    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "Error occured during deleting the data", error))
    }
}


module.exports = { createFund, getAllFundraiser, getSingleFundraiserById, updateSingleFundraiser, deleteFundraiser }