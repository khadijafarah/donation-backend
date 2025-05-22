const express = require('express')
const router = express.Router()
const donationTransactionController = require ("../controllers/donationTransactionController")


router.post("/create-donation-transaction" ,donationTransactionController.createDonationTransaction)
// router.get("/donation-transaction" ,donationTransactionController.getAllDonationTransaction)
// router.get("/fundraisers/:id" ,fundRaisingController.getSingleFundraiserById)
// router.put("/fundraisers/:id" , fundRaisingController.updateSingleFundraiser)
// router.delete("/fundraisers/:id" , fundRaisingController.deleteFundraiser)




module.exports = router