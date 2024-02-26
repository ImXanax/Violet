import {
  CommandInteraction,
  ChatInputCommandInteraction,
} from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

export interface CommandData {
  data: SlashCommandBuilder;
  run: (
    interaction: ChatInputCommandInteraction
  ) => void | Promise<void>;
}
export class Command {
  constructor(public readonly data: CommandData) {} 
} 