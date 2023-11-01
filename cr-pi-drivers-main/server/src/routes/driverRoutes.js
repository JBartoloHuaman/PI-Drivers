const { Router } = require('express');
const postDriverHandler = require("../handlers/postDriverHandler");
const getDriversHandler = require('../handlers/getDriversHandler');
const DriverByIdHandler = require('../handlers/DriverByIdHandler');

const driversRoutes = Router();

driversRoutes.get("/", getDriversHandler)
driversRoutes.get("/:id", DriverByIdHandler)
driversRoutes.post("/", postDriverHandler)


module.exports = driversRoutes;
