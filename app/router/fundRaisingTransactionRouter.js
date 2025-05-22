const express = require('express')
const router = express.Router()
const fundRaisingTransactionController = require ("../controllers/fundRaisingTransactionController")


router.post("/create-transaction" ,fundRaisingTransactionController.createTransaction)
// router.get("/fundraisers-transaction" , fundRaisingTransactionController.getAllFundraisingTransaction)
// router.get("/fundraisers/:id" ,fundRaisingController.getSingleFundraiserById)
// router.put("/fundraisers/:id" , fundRaisingController.updateSingleFundraiser)
// router.delete("/fundraisers/:id" , fundRaisingController.deleteFundraiser)




module.exports = router