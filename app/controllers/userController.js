const User = require("../models/UserModel")
const status = require("http-status")
const generateToken = require("../utils/token");
const response = require ("../utils/response")

const signup = async(req,res)=>{
    try {
        const newUser = new User(req.body)
        const result = await newUser.save()
        res.status(status.status.CREATED).send(response.createSuccessResponse(status.status.CREATED, "User Created Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during creating a user", error))
    }
}

const signin = async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(status.status.NOT_FOUND).send({
                status:"Error",
                statusCode:status.status.NOT_FOUND,
                message:"User not found"
            })
        }

        console.log(user)

        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(status.status.UNAUTHORIZED).send({
                status:"Error",
                statusCode:status.status.UNAUTHORIZED,
                message:"Credentials did not Match",

            })
        }
        const token = generateToken(user)

    //    console.log(token)
         res.cookie("accessToken",token,{
            httpOnly:false,
            secure:true,
            maxAge:60 * 60 * 1000
         })

        res.status(status.status.OK).send({
            status: "success",
            statusCode: status.status.OK,
            message:"User logged in successfully",
            data:user

        })

    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send({
            status:"Error",
            statusCode: status.status.INTERNAL_SERVER_ERROR,
            message:"An Error Occured during signin",
            error:error.message
        })
    }
}

const getAllUser = async (req,res) =>{
    try {
        const result = await User.find()
        res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "All Data retrieved Successfully", result))
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving all User data", error))
    }
}

const getSingleUserById = async(req,res) =>{
    try {
        const {id} = req.params
        console.log(id)
        const result = await User.findById(id)
        if(!result){
            return res.status(status.status.NOT_FOUND).send(response.createErrorResponse(status.status.NOT_FOUND,"User not found" ))
        }
        if(result){
            return res.status(status.status.OK).send(response.createSuccessResponse(status.status.OK, "Single user Data retrieved Successfully", result))
        }
    } catch (error) {
        res.status(status.status.INTERNAL_SERVER_ERROR).send(response.createErrorResponse(status.status.INTERNAL_SERVER_ERROR, "An error occured during retrieving a user data", error))
    }
}

module.exports = {signup , signin, getAllUser, getSingleUserById }