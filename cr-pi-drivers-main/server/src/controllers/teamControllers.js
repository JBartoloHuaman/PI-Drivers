const { Team } = require("../db");
const axios = require("axios");

const getTeamsController = async (req,res) => {
    
    const teamsDB = await Team.findAll();

    if(!teamsDB.length){
        const { data } = await axios("http://localhost:5000/drivers");
        const teamsData = [];

        data.forEach(driver => {
            if(driver.teams){               
                const teamSplit = driver.teams.split(/\s*,\s*/); 
                teamSplit.forEach(team => teamsData.push(team))
            }
        })

        const teamUnique = new Set(teamsData);
        const teams = [...teamUnique];

        teams.forEach(async team => {
            await Team.findOrCreate({
                where: {name: team}
            })
        })

        return teams;
    }

    return teamsDB.map(team => team.name);
}

module.exports = getTeamsController;