import { ActivityType, Client, EmbedBuilder, Events } from "discord.js";
import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import chalk from "chalk";
import { X } from "../funcs/Xan.js";

const url = "http://dmaorg.info/found/15398642_14/clancy.html";

export default {
  name: Events.ClientReady,
  async run(client: Client) {
    if (!client.user || !client.application) return;

    /* READY */
    console.log(`🟪 OPERATIONAL`);
    client.user.setPresence({
      activities: [{ name: "You" }],
      status: "dnd",
    });
    client.channels
      .fetch("1012390735611433031")
      .then((channel) => {
        if (channel?.isTextBased()) {
          const readyEmbed = new EmbedBuilder()
            .setDescription("```ONLINE```")
            .setColor(X.hex.primary);
          channel.send({ embeds: [readyEmbed] });
        }
      })
      .catch((err) => console.log(err));

    /* WATCHER */
    setInterval(async () => {
      const initialHTML = fs.readFileSync("initial.html", "utf-8");
      const botChannel = await client.channels.fetch("1012390735611433031");

      if (initialHTML) {
        const currentHTML = await fetchHTML(url);
        if (currentHTML) {
          fs.writeFileSync("current.html", currentHTML);
          console.log(chalk.blue("╢ Current HTML saved."));
          const result = await compareHTML();
          if (result === 1) {
            const $ = cheerio.load(currentHTML);
            const allImg = $("img");
            allImg.each(function (i, img) {
              console.log($(img).attr("src"));
            });
            if (botChannel?.isTextBased()) {
              console.log(chalk.magenta("╢ " + " Changes Detected"));
              botChannel.send({
                content: "Changes Detected: <@413755451373518864>",
              });
            }
          } else {
            console.log(chalk.magenta("╢ " + " No Changes..."));
          }
        }
      }
    }, 1 * 60000);
  },
};

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
  console.log(chalk.yellow("╢ Initial HTML updated."));
}

async function compareHTML() {
  const initialHTML = fs.readFileSync("initial.html", "utf-8");
  const currentHTML = fs.readFileSync("current.html", "utf-8");
  if (initialHTML === currentHTML) {
    return 0;
  } else {
    const initialHTML = await fetchHTML(url);
    if (initialHTML) saveHTML(initialHTML);
    return 1;
  }
}
