const jwt = require('jsonwebtoken')
const AppError = require('../utils/appError')
const prisma = require('./../DB/db.config')
const catchAsync = require('./../utils/catchAsync')
const bcrypt = require('bcrypt')
const {promisify} = require('util')


exports.protected = catchAsync(async (req, res, next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(new AppError('You are not logged in! Please log in to get access.', 401))
    }
    // Verification token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    console.log(decode)
    // check if user still exists
    const currentUser = await prisma.users.findUnique({where:{id:decode.id}})
    if(!currentUser){
        return next(new AppError(' The user belonging this token does no longer exist.',401))
    }
    // check if user changed password after the token was issued
    const tokenIssuedAt = new Date(decode.iat)
    if (currentUser.passwordChangedAt && currentUser.passwordChangedAt > tokenIssuedAt){
        return next(new AppError('User has changed password since the token was issued.Please login again.',401))
    }
    req.user = currentUser
    next()
})

exports.restrictTo = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            next(new AppError('You do not have permission to perform this action!',403))
        }
        next()
    }
}



exports.signup = catchAsync( async (req, res, next)=>{
    const {email, password, confirmPassword, role} = req.body
    const findUser = await prisma.users.findUnique({
        where:{
            email
        }
    })
    if(password !== confirmPassword){
        return next(new AppError('Password did not matched!', 400))
    }
    if(findUser){
        return next(new AppError('This email has been already taken, try another!',400))
    }
    const hashedPassword  = await bcrypt.hash(password, 12)
    const newuser =await prisma.users.create({
        data:{email, password:hashedPassword , role }
    })
    const token = jwt.sign({id:newuser.id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIREIN})
    return res.status(201).json({
        status:'success',
        token,
        data:newuser
    })

})

exports.signin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // Find the user by email
    const user = await prisma.users.findUnique({
        where: { email }
    });
    // If no user found, return an error
    if (!user) {
        return next(new AppError('No user found with this email!', 401));
    }
    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError('Incorrect password!', 401));
    }
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Add this line for debugging
console.log('JWT_EXPIREIN:', process.env.JWT_EXPIREIN); 
    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIREIN });

    // Send response
    return res.status(200).json({
        status: 'success',
        token
    });
});