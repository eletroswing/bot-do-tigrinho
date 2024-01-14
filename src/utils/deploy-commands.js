const dotenv = require("dotenv");
if(process.env.NODE_ENV != "production") {
    dotenv.config();
}

const Logger = require("./../../infra/logger");

const { REST, Routes } = require("discord.js")

const TOKEN = process.env.TOKEN
const CLIENT_ID = process.env.CLIENT_ID

// import commands
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "..", "commands")
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandFiles) { 
   const command = require(`./../commands/${file}`)
   commands.push(command.data.toJSON())
}

// REST
const rest = new REST({version: "10"}).setToken(TOKEN);

// deploy
async function deploy() {
    try {
        Logger.log(`Reset ${commands.length} commands...`)
    
        // PUT
        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            {body: commands}
        )
            Logger.log("Commands registred!")
    }
    catch (error){
        Logger.error(error)
    }
}

module.exports = deploy;