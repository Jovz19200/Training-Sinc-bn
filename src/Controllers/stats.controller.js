const {getAnnualStatsService, getMonthlyStatsService, getQuarterlyStats, StatisticsService} = require('../Services/stats.service');


const getMonthlyStatsController = async (req, res) => {
    try{
        const stats = await getMonthlyStatsService();
        if(!stats){
            res.status(404).json({
                message: "No stats found",
                data: []
            })
        }
        else{
            res.status(200).json({
                message: "Stats retrieved successfully",
                stats
            })
        }
    }
    catch(err){
        console.error("Error fetching stats", err);
    }
}

const getQuarterlyStatsController = async (req, res) => {
    try{
        const stats = await getQuarterlyStats();
        if(!stats){
            res.status(404).json({
                message: "No stats found",
                data: []
            })
        }
        else{
            res.status(200).json({
                message: "Stats retrieved successfully",
                stats
            })
        }
    }
    catch(err){
        console.error("Error fetching stats", err);
    }
}

const getAnnualStatsController = async (req, res) => {
    try{
        const stats = await getAnnualStatsService();
        if(!stats){
            res.status(404).json({
                message: "No stats found",
                data: []
            })
        }
        else{
            res.status(200).json({
                message: "Stats retrieved successfully",
                stats
            })
        }
    }
    catch(err){
        console.error("Error fetching stats", err);
    }
}

const getMonthlyTrainingsStatsController = async (req, res) =>{
    try{
    const { year, month} = req.body
   const stats =  await StatisticsService.getMonthlyTrainings(year, month)

    if(!stats || stats.length == 0){
        res.status(404).json({
            message: "No stats found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Stats retrieved successfully",
            stats
        })
    }
}catch(err){
    console.error("Error fetching stats", err);
}
}

const getQuarterlyTrainingsStatsController = async (req, res) =>{
    try{
        const { year, quarter} = req.body
        const stats =  await StatisticsService.getQuarterlyTrainings(year, quarter)
     
         if(!stats){
             res.status(404).json({
                 message: "No stats found",
                 data: []
             })
         }
         else{
             res.status(200).json({
                 message: "Stats retrieved successfully",
                 stats
             })
         }
    }
    catch(err){
        console.error("Error fetching stats", err);
    }
}


const getAnnualTrainingsStatsController = async (req, res) =>{
    const { year} = req.body
   const stats =  await StatisticsService.getAnnualTrainings(year)

    if(!stats){
        res.status(404).json({
            message: "No stats found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Stats retrieved successfully",
            stats
        })
    }
}

module.exports ={
    getAnnualStatsController,
    getQuarterlyStatsController,
    getMonthlyStatsController,
    getMonthlyTrainingsStatsController,
    getQuarterlyTrainingsStatsController,
    getAnnualTrainingsStatsController
}