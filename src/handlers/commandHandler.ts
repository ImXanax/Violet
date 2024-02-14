import * as fs from "fs";
import * as path from "path";
import { Collection } from "discord.js";
import { Vclient } from "../structures/Vclient";

export async function commandHandler(client: Vclient) {
    try{

        client.commands = new Collection();
        const foldersPath = path.join(__dirname, "../commands");
        const commandFolders = fs.readdirSync(foldersPath);
        
        for (const folder of commandFolders) {
            const commandsPath = path.join(foldersPath, folder);
            const commandFiles = fs
            .readdirSync(commandsPath)
            .filter((file: string) => file.endsWith(".js"));
            
            for (const file of commandFiles) {
                console.log(commandFiles);
                const filePath = path.join(`file:///`, commandsPath, file);
                const { default: command } = (await import(filePath))?.default;
                client.commands.set(command.data.data.name, command.data);
            }
        }
    }catch(err){ console.error(err)}
}
