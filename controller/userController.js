const prisma = require('./../DB/db.config.js')

exports.createUser = async (req, res)=>{
    try {
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
    } catch (error) {
        
    }
}

exports.updateUser = async (req, res)=>{
    try {
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
    } catch (error) {
        res.json({error})
    }
}

exports.getAllUsers = async (req, res)=>{
    try {
        const users = await prisma.user.findMany({include:{posts:true}})
        res.status(200).json({
            status:'ok',
            data:users
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}


exports.getSingleUser = async (req, res)=>{
    try {
        const userId = req.params.id
        const user = await prisma.user.findUnique({
            where:{
                id: userId * 1
            },
            include:{posts:true}
        })
        if(!user){
            return res.status(400).json({
                status:'fail',
                message:'not found'
            })
        }
        return res.json({
            status:'success',
            data:user,
            post:user.posts[1].description
        })
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'An error occurred while retrieving the user.',
            details: error.message
        });
    }
}



exports.deleteUser = async (req, res)=>{
    try {
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
    } catch (error) {
        return res.status(500).json({
            status:'fail',
            message:'User not deleted!',
            error: error
        })
    }
}