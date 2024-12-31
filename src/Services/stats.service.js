const {Training, User} = require('../models/user.model');

const getMonthlyStatsService = async () => {
    try{
        const users = await User.find({});
        const trainings = await Training.find({});

        const monthlyStats = {
            users: users.length,
            trainings: trainings.length
        }

        return monthlyStats;
    }
    catch(error){
        console.error("Error fetching monthly stats", error);
    }
}
const getQuarterlyStats = async () => {
    try{
        const users = await User.find({});
        const trainings = await Training.find({});

        const quarterlyStats = {
            users: users.length,
            trainings: trainings.length
        }

        return quarterlyStats;
    }
    catch(error){
        console.error("Error fetching quarterly stats", error);
    }
}

const getAnnualStatsService = async () => {
    try {
        const stats = await User.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { "_id.year": 1 }
            }
        ]);
        return stats;
    } catch (error) {
        console.error("Error retrieving annual stats", error);
        throw error;
    }
};

class StatisticsService {
    static async getMonthlyTrainings(year, month) {
        try {
        
            const trainings = await Training.aggregate([
                {
                    $match: {
                        updatedAt: {
                            $gte: new Date(`${year}-${month}-01`),
                            $lt: new Date(`${year}-${month + 1}-01`)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'users',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                }
            ]);
            return trainings;
        } catch (error) {
            console.error("Error retrieving monthly trainings", error);
            throw error;
        }
    }

    static async getQuarterlyTrainings(year, quarter) {
        try {
            const startMonth = (quarter - 1) * 3 + 1;
            const endMonth = startMonth + 3;
            const trainings = await Training.aggregate([
                {
                    $match: {
                        updatedAt: {
                            $gte: new Date(`${year}-${startMonth}-01`),
                            $lt: new Date(`${year}-${endMonth}-01`)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'users',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                }
            ]);
            return trainings;
        } catch (error) {
            console.error("Error retrieving quarterly trainings", error);
            throw error;
        }
    }

    static async getAnnualTrainings(year) {
        try {
            const trainings = await Training.aggregate([
                {
                    $match: {
                        updatedAt: {
                            $gte: new Date(`${year}-01-01`),
                            $lt: new Date(`${year + 1}-01-01`)
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'users',
                        foreignField: '_id',
                        as: 'userDetails'
                    }
                }
            ]);
            return trainings;
        } catch (error) {
            console.error("Error retrieving annual trainings", error);
            throw error;
        }
    }
}



module.exports = {
    getMonthlyStatsService,
    getQuarterlyStats,
    getAnnualStatsService,
    StatisticsService
}