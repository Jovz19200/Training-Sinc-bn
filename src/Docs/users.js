const userSchema = {
    type : "object",
    properties: {
        name: {
            type: "string",
        },
        email: {
            type: "string",
        },
        password: {
            type: "string",
        },
    }
}
const loginSchema = {
    type: "object",
    properties: {
        email: {
            type: "string",
        },
        password:{
            type: "string"
        }
    }
}

const getUsers = {
    tags: ['Users'],
    summary: "Get all users",


    responses: {
        200: {
            description: "Success",
        },
        500: {
            description: "Internal Server Error",
        },
    }
}

const createUser = {
    tags: ['Users'],
    summary: "register a new user",

    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#components/schemas/User"
                }
            }
        }
    },

    responses:{
        201:{
            description: "User Created successfully"
        },
        409:{
            description: "User already exist"
        },
        500: {
            description: "Internal server error"
        }
    }
}

const userLogin = {
    tags: ['Users'],
    summary: "Login a user",

    requestBody:{
        required: true,
       
        content:{
            "application/json":{
                schema:{
                    $ref: '#components/schemas/Login'
                }
            }
        }
    },

    responses:{
        200: {
            description: "User Logged in successfully"
        },
        404:{
            description: "User not Found"
        },
        500:{
            description: "Internal server error"
        }
    }
}

const getLoggedInUser = {
    tags: ['Users'],
    security: [{ bearerAuth: []}],
    summary: "Get the Logged In User",


    responses:{
        200: {
            description: "User retrieved successfully",
        },
        404:{
            description: "User not found"
        },
        500:{
            description: "Internal server error"
        }
    }
}



module.exports = {
    userSchema,
    loginSchema,
    getUsers,
    createUser,
    userLogin,
    getLoggedInUser

};