const { Sequelize } = require("sequelize");
const {Driver, Team} = require("../db");
const axios = require("axios");

const createDriver = async ({
    name,lastname,description,
    image,nacionality,birthdate,
    teams
}) => {
    if(!name || !lastname || !description || !image 
        || !nacionality || !birthdate || !teams) throw Error("Missing data")

    const newDriver = await Driver.create({
        name,lastname,description,
        image,nacionality,birthdate
    })

    const teamsDB = await Team.findAll({
        where: {
            name:{
                [Sequelize.Op.in]: teams
            }
        }
    });
    await newDriver.addTeam(teamsDB)
    return newDriver;
}

const getDriversDB = async () => {
    const driversDB = await Driver.findAll({
        include: {
            model: Team,
            attributes:["name"],
            through:{
                attributes:[]
            }
        }
    })
    const driversDBmap = driversDB.map(driver => {
        return {
            id          : driver.id,
            name        : driver.name,
            lastname    : driver.lastname,
            description : driver.description,
            image       : driver.image,
            nacionality : driver.nacionality,
            birthdate   : driver.birthdate,
            Teams       : driver.Teams.map(team => team.name)
        }
    })
    return driversDBmap
}

const getDriversApi = async () => {
    const { data } = await axios("http://localhost:5000/drivers");
    const datamap = data.map(driver => {
        return {
            id          : driver.id,
            name        : driver.name.forename,
            lastname    : driver.name.surname,
            description : driver.description,
            image       : driver.image.url,
            nacionality : driver.nationality,
            birthdate   : driver.dob,
            Teams       : driver.teams?.split(/\s*,\s*/)
        }
    })
    return datamap;
}

const getDrivers = async (name) => {
    const driversDB = await getDriversDB();
    const driversApi = await getDriversApi();
    const drivers = [...driversDB,...driversApi];
    if(name){
        const driverFound = drivers.filter(
            d => d.name.toLowerCase().includes(name.toLowerCase())
        )
        if(!driverFound.length) throw Error(`Driver with name '${name}' not found`)
        const driverSlice = driverFound.slice(0,15)
        return driverSlice;
    }
    
    return drivers
}

const getDriverById = async (id) => {
    if(isNaN(id)){
        const driver = await Driver.findByPk(id);
        if(!driver)  throw Error("the driver was not found");
        return driver;
    }
    const drivers = await getDriversApi();
    const driverFound = drivers.find(driver => driver.id == id)
    if(!driverFound)  throw Error("the driver was not found");
    return driverFound;
}

module.exports = {createDriver,getDrivers,getDriverById};