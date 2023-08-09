import {
  Client,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextChannel,
  CategoryChannel,
  TextBasedChannel,
  Embed,
} from "discord.js";
import axios from "axios";

import { Command } from "../Command";

export const Weather: Command = {
  name: "weather",
  description: "weather forecast - empty lon/lat defaults to a location",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "lat",
      description: "latitude of the location",
      type: ApplicationCommandOptionType.String,
    },
    {
      name: "lon",
      description: "longitude of the location",
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const lat = interaction.options.getString("lat") ?? "35.3";
    const lon = interaction.options.getString("lon") ?? "51.6";
    const options = {
      method: "GET",
      url: process.env.rapid_url,
      params: {
        lat: `${lat}`,
        lon: `${lon}`,
      },
      headers: {
        "X-RapidAPI-Key": process.env.rapid_api,
        "X-RapidAPI-Host": process.env.rapid_host,
      },
    };

    try {
      const response = await axios.request(options);
      const weatherEmbed = new EmbedBuilder()
        .setDescription(
          `
            ### ${response.data.data[0].city_name} / ${response.data.data[0].datetime}
            - **Temp:** ${response.data.data[0].temp}°
            - **Precipitation:** ${response.data.data[0].precip}%
            - **Air Qualiy:** ${response.data.data[0].aqi}
            - **Cloudy:** ${response.data.data[0].clouds}%
        `
        )
        .setColor("#3B059E");
      interaction.followUp({ embeds: [weatherEmbed] });
    } catch (error) {
      console.error();
      interaction.followUp({ content: `## ERROR: *DAILY API CALLS REACHED*` });
    }
  },
};
