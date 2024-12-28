const  {getAllCategoriesService, createCategoryService} = require('../Services/categories.services');


const createCategoryController = async (req, res) => {
    try{
        const {name, description} = req.body;

        const data = {
            name,
            description
        }

        const category = await createCategoryService(data);

        if(!category){
            res.status(409).json({
                message: "Category already exist",
            })
        }
        else{
            res.status(201).json({
                message: "Category created successfully",
                category});
            }
    }
    catch(err){
        res.status(500).json({
            message: "Error creating the category"
        })
    } 
}

const retrieveAllCategoriesController = async (req, res) => {
    const categories = await getAllCategoriesService();
    if(!categories || categories.length === 0){
        res.status(404).json({
            message: "No categories found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Categories retrieved successfully",
            categories
        })
    }
}


module.exports  = {
    createCategoryController,
    retrieveAllCategoriesController,
}