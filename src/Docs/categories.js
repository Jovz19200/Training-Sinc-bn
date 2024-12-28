const categorySchema = {
    type: "object",
    properties:{
        name: { type: "String", required: true },
        description: { type: "String", required: false}
    }
   
}
const getAllCategories = {
    tags: ['Categories'],
    description: "Get all categories",
    operationId: 'getAllCategories',
    responses: {
        "200": {
            description: "Categories were obtained",
            content: {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: categorySchema
                        }
                    }
                }
            }
        },
        "404": {
            description: "No categories found",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            },
                            data: {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: categorySchema
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const createCategory = {
    tags: ['Categories'],
    description: "Create a new category",
    operationId: 'createCategory',
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: categorySchema
                }
            }
        }
    },
    responses: {
        "201": {
            description: "Category created successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: categorySchema
                    }
                }
            }
        },
        "409": {
            description: "Category already exists",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            message: {
                                type: "string"
                            }
                        }
                    }
                }
            }
        }
    }
}

module.exports = {
    // categorySchema,
    getAllCategories,
    createCategory
}