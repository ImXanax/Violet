const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");
const Levels = require("../../funcs/Levels");
module.exports = {
  data: new SlashCommandBuilder()
    // -edit [xp,level] [add/set/remove]
    .setName("edit")
    .setDescription("seceret panel for tings")
    .addSubcommand((subcmd) =>
      subcmd
        .setName("xp")
        .setDescription("xp section")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("option")
            .setDescription("[add/set/remove]")
            .setRequired(true)
        )
        .addIntegerOption((n) =>
          n.setName("amount").setDescription("the value").setRequired(true)
        )
    )
    .addSubcommand((subcmd) =>
      subcmd
        .setName("level")
        .setDescription("level section")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("option")
            .setDescription("[add/set/remove]")
            .setRequired(true)
        )
        .addIntegerOption((n) =>
          n.setName("amount").setDescription("the value").setRequired(true)
        )
    ),
  async execute(ctx, client) {
    //PERM CHECK
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    if (!isAdmin) {
      return ctx.reply("You lack the permission to use this command.");
    }

    //INPUTS
    const user = ctx.options.getUser("user");
    const amount = ctx.options.getInteger("amount");
    let option = ctx.options.getString("option");

    option = option.toLowerCase();
    let resultEmbed = new MessageEmbed().setColor("#36057c");
    let member = await ctx.member.fetch(user.id);
    let dbMember = await Levels.fetch(member.user.id, member.guild.id);

    /*
    1- for getting the member
    2- fetching member from DB
    3- updating the members DB
    */

    //XP
    if (ctx.options.getSubcommand() === "xp") {
      console.log("-XP");
      //XP-ADD
      if (option === "add") {
        try {
          const result = await Levels.addXp(u.user.id, u.guild.id, amount);
          resultEmbed.setDescription(
            `Added **${amount}** of XP to **${u.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      }
      //XP-SET
      else if (option === "set") {
        try {
          ctx.member
            .fetch(user.id)
            .then((u) => {
              Levels.fetch(u.user.id, u.guild.id)
                .then(() => {
                  Levels.setXp(u.user.id, u.guild.id, amount)
                    .then(() => {
                      resultEmbed.setDescription(
                        `Set **${amount}** of XP for **${u.user.tag}**`
                      );
                      ctx.reply({ embeds: [resultEmbed] });
                    })
                    .catch((e) => console.error(`err in setting xp: ${e}`));
                })
                .catch((e) => console.error(`err in fetching member: ${e}`));
            })
            .catch((e) => console.error(e));
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      }
      //XP-REMOVE
      else if (option === "remove") {
        try {
          ctx.member
            .fetch(user.id)
            .then((u) => {
              Levels.fetch(u.user.id, u.guild.id)
                .then(() => {
                  Levels.subXp(u.user.id, u.guild.id, amount)
                    .then(() => {
                      resultEmbed.setDescription(
                        `Removed **${amount}** of XP from **${u.user.tag}**`
                      );
                      ctx.reply({ embeds: [resultEmbed] });
                    })
                    .catch((e) => console.error(`err in removing xp: ${e}`));
                })
                .catch((e) => console.error(`err in fetching member: ${e}`));
            })
            .catch((e) => console.error(e));
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      } else {
        ctx.reply({
          content: `provided argument is wrong\navailable options are: **[add/set/remove]**`,
        });
      }
    }

    //LEVEL
    else if (ctx.options.getSubcommand() === "level") {
      console.log("-LVL");
      //INPUTS
      const user = ctx.options.getUser("user");
      let option = ctx.options.getString("option");
      option = option.toLowerCase();
      const amount = ctx.options.getInteger("amount");

      if (option === "add") {
        try {
          ctx.member
            .fetch(user.id)
            .then((u) => {
              Levels.fetch(u.user.id, u.guild.id)
                .then(() => {
                  Levels.addLevel(u.user.id, u.guild.id, amount)
                    .then(() => {
                      resultEmbed.setDescription(
                        `Added **${amount}** of LEVEL/S to **${u.user.tag}**`
                      );
                      ctx.reply({ embeds: [resultEmbed] });
                    })
                    .catch((e) => console.error(`err in adding level: ${e}`));
                })
                .catch((e) => console.error(`err in fetching member: ${e}`));
            })
            .catch((e) => console.error(e));
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      } else if (option === "set") {
        try {
          ctx.member
            .fetch(user.id)
            .then((u) => {
              Levels.fetch(u.user.id, u.guild.id)
                .then(() => {
                  Levels.setLevel(u.user.id, u.guild.id, amount)
                    .then(() => {
                      resultEmbed.setDescription(
                        `Set **${amount}** of LEVEL/S for **${u.user.tag}**`
                      );
                      ctx.reply({ embeds: [resultEmbed] });
                    })
                    .catch((e) => console.error(`err in setting LEVEL: ${e}`));
                })
                .catch((e) => console.error(`err in fetching member: ${e}`));
            })
            .catch((e) => console.error(e));
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      } else if (option === "remove") {
        try {
          ctx.member
            .fetch(user.id)
            .then((u) => {
              Levels.fetch(u.user.id, u.guild.id)
                .then(() => {
                  Levels.subXp(u.user.id, u.guild.id, amount)
                    .then(() => {
                      resultEmbed.setDescription(
                        `Removed **${amount}** of LEVEL/S from **${u.user.tag}**`
                      );
                      ctx.reply({ embeds: [resultEmbed] });
                    })
                    .catch((e) => console.error(`err in removing LEVEL: ${e}`));
                })
                .catch((e) => console.error(`err in fetching member: ${e}`));
            })
            .catch((e) => console.error(e));
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      } else {
        ctx.reply({
          content: `provided argument is wrong\navailable options are: **[add/set/remove]**`,
        });
      }
    } else {
      ctx.reply({
        content: `provided argument is wrong\navailable options are: **[xp/level]**`,
      });
    }
  },
};
