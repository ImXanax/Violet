import { Collection, Client } from "discord.js"
import { Command } from "./Command"

export class Vclient extends Client<true> {
    commands = new Collection<string, Command>() 
} 