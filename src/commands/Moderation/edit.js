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
          await Levels.addXp(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(
            `Added **${amount}** of XP to **${member.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      }
      //XP-SET
      else if (option === "set") {
        try {
          await Levels.setXp(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(
            `Set **${amount}** of XP for **${member.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      }
      //XP-REMOVE
      else if (option === "remove") {
        try {
          await Levels.subXp(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(
            `Removed **${amount}** XP from **${member.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      } else {
        ctx.reply({
          content: `⚠️ Provided argument is wrong\nAvailable options are: **[add/set/remove]**`,
        });
      }
    }

    //LEVEL
    else if (ctx.options.getSubcommand() === "level") {
      console.log("-LVL");
      if (option === "add") {
        try {
          await Levels.addLevel(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(`Added **${amount}** of LEVEL/S to **${member.user.tag}**`);
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      } else if (option === "set") {
        try {
          await Levels.setLevel(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(
            `Set **${amount}** of LEVEL/S for **${member.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      } else if (option === "remove") {
        try {
          await Levels.subXp(member.user.id, member.guild.id, amount);
          resultEmbed.setDescription(
            `Removed **${amount}** of LEVEL/S from **${member.user.tag}**`
          );
          ctx.reply({ embeds: [resultEmbed] });
        } catch (e) {
          ctx.reply({ content: "1010 ERROR TRY AGAIN LATER" });
          console.error(`⚠️: ${e}`);
        }
      } else {
        ctx.reply({
          content: `⚠️ Provided argument is wrong\nAvailable options are: **[add/set/remove]**`,
        });
      }
    } 
  },
};
