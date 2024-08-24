const Person = require('./../model/personModel')

// exports.cheakBody = (req, res, next)=>{
//     if(!req.body.name || !req.body.age || !req.body.email){
//         return res.status(400).json({
//             status:'400 bad request',
//             message:'some field wos missing!'
//         })
//     }
//     next()
// }


exports.getAllPerson = async (req, res)=>{
    try {
        const persons = await Person.find()
        
        res.status(200).json({
            status:'200 ok',
            message:`${persons.length} records found`,
            data:{
                person:persons
            }
        })
    } catch (error) {
        console.log(error);
    }
}

exports.getPerson = async (req, res)=>{
    try {
        const person = await Person.findById(req.params.id)
        res.status(200).json({
            status:"200 ok",
            data:person
        })
    } catch (error) {
        
    }
}

exports.createPerson = async (req, res)=>{
    try {
        const newPerson = await Person.create(req.body)
        res.status(201).json({
            status: '201 created',
            data:{
                person: newPerson
            }
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error
        })
    }
}

exports.updatePerson = async (req, res)=>{
    try {
        const updatedPerson = await Person.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
        res.status(200).json({
            status:'200 Ok',
            data:updatedPerson
        })
    } catch (error) {
        res.status(404).json({
            status:'fail',
            message:error
        })
    }
}

exports.deletePerson = async (req, res)=>{
    try {
        await Person.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status:'ok'
        })
    } catch (error) {
        
    }
}