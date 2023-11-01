const { Router } = require("express");
const getTeamHandler = require("../handlers/getTeamHandler")

const teamsRoutes = Router();

teamsRoutes.get("/", getTeamHandler)

module.exports = teamsRoutes
