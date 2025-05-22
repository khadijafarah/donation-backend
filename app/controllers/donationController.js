
const status = require("http-status")
const response = require("../utils/response")
const Donation = require("../models/DonationModel")

const createDonation = async(req,res) => {
try {
      const newDonation = new Donation(req.body)  
      const result = await newDonation.save()
      res.status(status.status.CREATED).send(response.createSuccessResponse(status.status.CREATED, "New Donation created Successfully", result))
} catch (error) {
    res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during creation of New Donation", error))
}
}
//Retrieve all donations
const getAllDonation = async (req,res) =>{
const {search,sort} = req.query
let filter = {}
//here regex is used to remove case sensitive
if(search){
    filter.title = {$regex: search , $options: "i"};
}
let sortingCategory = {}
if(sort === "HighToLow"){
    sortingCategory.amount = -1
}
if (sort === "LowToHigh"){
    sortingCategory.amount = 1
}


console.log(search)
    try {
        const result = await Donation.find(filter).sort(sortingCategory);
        res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all donation data", error))
    }
}

const getSingleDonationById = async(req,res) =>{
    try {
        const {id} = req.params
        console.log(id)
        const result = await Donation.findById(id)
        if(!result){
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND,"Donation not found" ))
        }
        if(result){
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Single Donation Data retrieved Successfully", result))
        }
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving a data", error))
    }
}

const updateSingleDonation = async(req,res) => {
    try {
        const {id} = req.params
        const updatedData = req.body
        const result = await Donation.findByIdAndUpdate(id,updatedData , {new:true})
        if(!result){
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND,"Error occured while updating" ))
        }
        if(result){
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Donation updated Successfully", result))
        }
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "Error occured during updating the data", error))
    }
}

const deleteDonation = async (req,res) => {
    try {
        const {id} = req.params
        const result = await Donation.findByIdAndDelete(id)
        if(!result){
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND,"Donation Not Found" ))
        }
        if(result){
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Donation deleted Successfully", result))
        }

    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "Error occured during deleting the data", error))
    }
}

module.exports ={createDonation ,getAllDonation,getSingleDonationById, updateSingleDonation ,deleteDonation }
