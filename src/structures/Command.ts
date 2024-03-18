import { CommandInteraction, ChatInputCommandInteraction } from "discord.js";
import { SlashCommandBuilder } from "@discordjs/builders";

type CustomSlashCommandBuilder = Pick<SlashCommandBuilder, "toJSON">;

export interface CommandData {
  data: CustomSlashCommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => void | Promise<void>;
}
export class Command {
  constructor(public readonly data: CommandData) {}
}
