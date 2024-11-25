const home = {
    tags : ["Home"],
    summary : "Home Page",

    responses: {
          200: {
            description: "success",
          },
          500: {
            description: "Internal Server Error",
          },
    }
}

module.exports ={
    home
}