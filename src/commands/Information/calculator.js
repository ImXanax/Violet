const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");

const math = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calculator")
    .setDescription("calculates the inputs"),
  async execute(ctx, client) {
    /*
     b = backspace
     m = minus
     p = plus
     t = times
     e = equal
     d = divide
     c = clear
     */
    const rows = [
      new MessageActionRow().addComponents([
        new MessageButton({
          customId: ".",
          style: "SECONDARY",
          label: "▪️",
        }),
        new MessageButton({
          customId: "(",
          style: "SECONDARY",
          label: "(",
        }),
        new MessageButton({
          customId: ")",
          style: "SECONDARY",
          label: ")",
        }),
        new MessageButton({
          customId: "b",
          style: "SECONDARY",
          label: "<=",
        }),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton({
          customId: "7",
          style: "PRIMARY",
          label: "7",
        }),
        new MessageButton({
          customId: "8",
          style: "PRIMARY",
          label: "8",
        }),
        new MessageButton({
          customId: "9",
          style: "PRIMARY",
          label: "9",
        }),
        new MessageButton({
          customId: "+",
          style: "SECONDARY",
          label: "+",
        }),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton({
          customId: "4",
          style: "PRIMARY",
          label: "4",
        }),
        new MessageButton({
          customId: "5",
          style: "PRIMARY",
          label: "5",
        }),
        new MessageButton({
          customId: "6",
          style: "PRIMARY",
          label: "6",
        }),
        new MessageButton({
          customId: "-",
          style: "SECONDARY",
          label: "-",
        }),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton({
          customId: "1",
          style: "PRIMARY",
          label: "1",
        }),
        new MessageButton({
          customId: "2",
          style: "PRIMARY",
          label: "2",
        }),
        new MessageButton({
          customId: "3",
          style: "PRIMARY",
          label: "3",
        }),
        new MessageButton({
          customId: "*",
          style: "SECONDARY",
          label: "x",
        }),
      ]),
      new MessageActionRow().addComponents([
        new MessageButton({
          customId: "c",
          style: "DANGER",
          label: "C",
        }),
        new MessageButton({
          customId: "0",
          style: "PRIMARY",
          label: "0",
        }),
        new MessageButton({
          customId: "e",
          style: "SECONDARY",
          label: "=",
        }),
        new MessageButton({
          customId: "/",
          style: "SECONDARY",
          label: "/",
        }),
      ]),
    ];

    const msg = await ctx.reply({
      components: rows,
      embeds: [
        {
          description: "```RESULTS ARE BEING DISPLAYED HERE.```",
          color: "#0014e9",
        },
      ],
      fetchReply: true,
    });
    const filter = (i) => i.user.id === ctx.user.id;
    const msgCol = msg.createMessageComponentCollector(filter, 60000);

    let res = "";
    msgCol.on("collect", async (i) => {
      if (i.customId === "e") {
        try {
          res = math.evaluate(res).toString();
        } catch (e) {
          res = "ERR:1010<<|=- click on C to restart";
        }
      } else if (i.customId === "c") {
        res = "";
      } else if (i.customId === "b") {
        res = res.slice(0, res.length - 2);
      } else {
        const lastChar = res[res.length - 1];
        res +=
          `${
            (parseInt(i.customId) == i.customId || i.customId === ".") &&
            (lastChar == parseInt(lastChar) || lastChar === ".")
              ? ""
              : " "
          }` + i.customId;
      }
      i.update({
        embeds: [
          {
            color: "#0014e9",
            description: `\`\`\`${res || `RESULTS ARE DISPLAYED HERE`}\`\`\``,
          },
        ],
      });
    });
    msgCol.on("end", () => {
      msg.edit({
        components: [
          new MessageActionRow().addComponents([
            new MessageButton({
              label: "The Calculator Ended",
              disabled: true,
              customId: "end",
              style: "DANGER",
            }),
          ]),
        ],
      });
    });
  },
};
