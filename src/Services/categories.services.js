const {Category} = require('../models/training.model');

const createCategoryService = async (data) =>{
    try{
        const category = await Category.create(data);
        return category;
    }
    catch(error){
        console.error("Error creating category", error);
    }
}
const getAllCategoriesService = async () => {
    try{
        
        const categories = await Category.find({});
       
        if (!categories) {
            throw new Error("No categories found");
            return [];
        }
        return categories;
    }
    catch(error){
        console.error("Error retrieving categories", error);
    }
}


module.exports = {
    createCategoryService,
    getAllCategoriesService,
};