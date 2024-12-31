const express = require('express');
const { getAnnualStatsController, getQuarterlyStatsController, getMonthlyStatsController, getAnnualTrainingsStatsController, getMonthlyTrainingsStatsController, getQuarterlyTrainingsStatsController} = require('../Controllers/stats.controller');
const statsRouter = express.Router();

statsRouter.get('/monthly', getMonthlyStatsController);
statsRouter.get('/quarterly', getAnnualStatsController);
statsRouter.get('/annually', getQuarterlyStatsController )
statsRouter.get('/trainings/monthly', getMonthlyTrainingsStatsController);
statsRouter.get('/trainings/quarterly', getAnnualTrainingsStatsController);
statsRouter.get('/trainings/annually', getQuarterlyTrainingsStatsController)


module.exports = statsRouter;
