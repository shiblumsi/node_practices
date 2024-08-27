const { query } = require("express")
const Tour = require("../model/tourModel")

exports.createTour = async (req, res)=>{
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status:'201 created',
            newTour
        })
    } catch (error) {
        res.status(201).json({
            status:'fail',
            message:error
            })
    }
}


exports.getAllTour = async (req, res)=>{
    try {
        const queryObj = {...req.query}
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el=> delete queryObj[el])

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt lte | lt)\b/g, match => `$${match}`)
        console.log(JSON.parse(queryStr));
        
        let query = Tour.find(JSON.parse(queryStr))
        console.log(query);
        
        if(req.query.sort){
            query = query.sort(req.query.sort)
        }
        
        //const tours = await Tour.find()

        const tours = await query
        res.status(200).json({
            status:'success',
            records:tours.length,
            data:tours
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error
        })
    }
}