const express = require('express')
const router = express.Router()
const fundRaisingController = require ("../controllers/fundRaisingController")

router.post("/create-fund" ,fundRaisingController.createFund)
router.get("/fundraisers" , fundRaisingController.getAllFundraiser)
router.get("/fundraisers/:id" ,fundRaisingController.getSingleFundraiserById)
router.put("/fundraisers/:id" , fundRaisingController.updateSingleFundraiser)
router.delete("/fundraisers/:id" , fundRaisingController.deleteFundraiser)




module.exports = router