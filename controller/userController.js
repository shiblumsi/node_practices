const AppError = require('../utils/appError.js')
const prisma = require('./../DB/db.config.js')
const catchAsync = require('./../utils/catchAsync')


exports.createUser = catchAsync( async (req, res, next)=>{
 
        const {name, email, password} = req.body
        
        const findUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(findUser){
            return res.json({status:'ok',message:'This email already has taken'})
        }
        const newUser = await prisma.user.create({
            data:{
                name,email,password
            }
        })
        return res.json({
            status:'201 created',
            data:newUser
        })
    
})

exports.updateUser = catchAsync(async (req, res, next)=>{

        const userId = req.params.id
        console.log(typeof(userId * 1));
        
        const {name, email, password} = req.body
        const updatedUser = await prisma.user.update({
            where:{
                id:userId * 1
            },
            data:{
                name:name,
                email:email,
                password:password
            }
        })
        return res.json({
            status:'ok',
            data:updatedUser
        })
   
})

exports.getAllUsers = catchAsync(async (req, res, next)=>{

        const users = await prisma.user.findMany({include:{posts:true}})
        res.status(200).json({
            status:'ok',
            records:users.length,
            data:users
        })
    
})


exports.getSingleUser = catchAsync(async (req, res, next)=>{
   
        const userId = req.params.id
        const user = await prisma.user.findUnique({
            where:{
                id: userId * 1
            },
            include:{posts:true}
        })
        if(!user){
            // return res.status(400).json({
            //     status:'fail',
            //     message:'not found'
            // })
            return next(new AppError('Result not found with that id',404))
        }
        return res.json({
            status:'success',
            data:user,
            post:user.posts[1].description
        })
   
} )



exports.deleteUser = catchAsync(async (req, res, next)=>{
    
        const userId = req.params.id
        const deletedUser = await prisma.user.delete({
            where:{
                id:userId * 1
            }
        })
        return res.status(204).json({
            status:'ok',
            message:'User deleted successfully!',
            deleted_Data: deletedUser
        })
   
})