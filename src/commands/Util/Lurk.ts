import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../structures/Command";
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";


export default new Command({
  data: new SlashCommandBuilder().setName("lurk").setDescription("i lurk"),
  async run(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const url = "http://dmaorg.info/found/15398642_14/clancy.html";
    // const initialHTML = await fetchHTML(url);
    const initialHTML = fs.readFileSync("initial.html", "utf-8");
    const $ = cheerio.load(initialHTML);
    const allImg = $("img");

    allImg.each(function (i, img) {
      console.log($(img).attr("src"));
    });

    if (initialHTML) {
      // saveHTML(initialHTML);
      // console.log("Initial HTML saved.");
      setTimeout(async () => {
        const currentHTML = await fetchHTML(url);
        if (currentHTML) {
          fs.writeFileSync("current.html", currentHTML);
          console.log("Current HTML saved.");
          const result = compareHTML();
          await interaction.followUp({ content: result });
        }
      }, 8000);
    }
  },
});

async function fetchHTML(url: string) {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
      },
    });
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function saveHTML(html: string) {
  fs.writeFileSync("initial.html", html);
}

function compareHTML() {
  const initialHTML = fs.readFileSync("initial.html", "utf-8");
  const currentHTML = fs.readFileSync("current.html", "utf-8");
  if (initialHTML === currentHTML) {
    console.log("No Changes Detected.");
    return "No Changes...";
  } else {
    console.log("Changes Detected..");
    return "Changes Detected!!!";
  }
}
