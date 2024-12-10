const express = require('express')
const router = express.Router()
const donationController = require ("../controllers/donationController")

router.post("/create-donation" ,donationController.createDonation)
router.get("/donations" , donationController.getAllDonation)
router.get("/donations/:id" , donationController.getSingleDonationById)
router.put("/donations/:id" , donationController.updateSingleDonation)
router.delete("/donations/:id" , donationController.deleteDonation)




module.exports = router