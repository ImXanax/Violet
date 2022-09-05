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

    //XP
    if (ctx.options.getSubcommand() === "xp") {
      console.log("xp");
      //INPUTS
      const user = ctx.options.getUser("user");
      let option = ctx.options.getString("option");
      const amount = ctx.options.getInteger("amount");

      //OPT
      if (option === "add") {
        try {
          ctx.member.fetch(user.id).then((u) => {
            Levels.fetch(u.user.id, u.guild.id)
              .then(() => {
                Levels.addXp(u.user.id, u.guild.id, amount)
                  .then(() =>
                    console.log(`added ${amount} XP to ${u.user.tag}`)
                  )
                  .catch((e) => console.error(`err in adding xp: ${e}`));
              })
              .catch((e) => console.error(`err in fetching membe: ${e}`));
          }).catch(e=>console.error(e))
        } catch (e) {
          console.error(`err in everything?: ${e}`);
        }
      } else if (option === "set") {
      } else if (option === "remove") {
      } else {
        ctx.reply({
          content: `provided argument is wrong\navailable options are: **[add/set/remove]**`,
        });
      }
      //FETCH
      // ctx.member
      // .fetch(user.id)
      // .then((m) => {
      //   Levels.fetch(m.user.id, m.guild.id)
      //     .then((i) => {
      //       console.log(i);
      //     })
      //     .catch((er) => console.error(er));
      // })
      // .catch((e) => console.error(`error in fetching user from DB: ${e}`));
    }

    //LEVEL
    else if (ctx.options.getSubcommand() === "level") {
      console.log("lvl");
      //INPUTS
      const user = ctx.options.getUser("user");
      const option = ctx.options.getString("option");
      const amount = ctx.options.getInteger("amount");
    } else {
      ctx.reply({
        content: `this got triggered for some reason`,
      });
    }
  },
};
