const {retrieveAllCategoriesController, createCategoryController} = require('../Controllers/categories.controller');
const express = require('express');

const categoriesrouter = express.Router();

categoriesrouter.post('/create', createCategoryController);
categoriesrouter.get('/', retrieveAllCategoriesController);

module.exports = categoriesrouter;