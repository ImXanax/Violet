const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");
const { to } = require("mathjs");

module.exports = {
  data: new SlashCommandBuilder()

    //1 KICK
    .setName("mod")
    .setDescription("includes series of ways to bully users")
    .addSubcommand((subcmd) =>
      subcmd
        .setName("kick")
        .setDescription("kicks user")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("reason")
            .setDescription("reason for this action")
            .setRequired(false)
        )
    )
    //2 BAN
    .addSubcommand((subcmd) =>
      subcmd
        .setName("ban")
        .setDescription("bans user")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("reason")
            .setDescription("reason for this action")
            .setRequired(false)
        )
        .addIntegerOption((purge) =>
          purge
            .setName("purge")
            .setDescription("the amount of time for this action")
            .setRequired(false)
        )
    )
    //3 UNBAN
    .addSubcommand((subcmd) =>
      subcmd
        .setName("unban")
        .setDescription("unbans user")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("reason")
            .setDescription("reason for this action")
            .setRequired(false)
        )
    )
    //4 MUTE
    .addSubcommand((subcmd) =>
      subcmd
        .setName("mute")
        .setDescription("mutes user")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
        .addStringOption((str) =>
          str
            .setName("reason")
            .setDescription("reason for this action")
            .setRequired(false)
        )
        .addIntegerOption((time) =>
          time
            .setName("time")
            .setDescription("the amount of time for this action")
            .setRequired(false)
        )
    )
    //5 UNMUTE
    .addSubcommand((subcmd) =>
      subcmd
        .setName("unmute")
        .setDescription("mutes user")
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("the user that the effects are being applied on")
            .setRequired(true)
        )
    ),
  async execute(ctx, client) {
    /* [1-KICK/2-BAN/3-UNBAN/4-MUTE/5-UNMUTE]
    1)/MOD KICK {user} [reason]
    2)/MOD BAN {user} [reason] [msgPurgeAmountInSec = 0]
    3)/MOD UNBAN {user} [reason]
    4)/MOD MUTE {user} [time]
    5)/MOD UNMUTE {user}
  */
    //PERM CHECK
    const isAdmin = ctx.member.roles.cache.has("1006984489332920331");
    if (!isAdmin) {
      return ctx.reply("You lack the permission to use this command.");
    }

    //INPUTS
    const user = ctx.options.getUser("user");
    let member = await ctx.member.fetch(user.id);
    let reason = reason ? ctx.options.getString("reason") : "No Reason";
    const time = time ? ctx.options.getInteger("time"): 86400000*7;
    //EMBED
    let resultEmbed = new MessageEmbed().setColor("#36057c");
    let errEmbed = new MessageEmbed().setColor("#36057c").setDescription(`⚠️**ERR 1010:**\n*Failure In Processing Command...*`)

    if (ctx.options.getSubcommand() === "kick") {
      try{
        await member.kick(reason)
        resultEmbed.setDescription(`**KICKED** ${member}\n**REASON:** ${reason}`)
        ctx.reply({embeds:[resultEmbed]})
      }catch(e){
        ctx.reply({embeds:[errEmbed]});
        console.error(`⚠️: ${e}`);
      }
    } else if (ctx.opitons.getSubcommand() === "ban") {
      try{
        const purgeAmountInSec = purgeAmountInSec ? ctx.options.getInteger('purge') : 0 ;
        await member.ban({deleteMessageSeconds: purgeAmountInSec , reason: reason})
        resultEmbed.setDescription(`**BANNED** ${member}\n**REASON:** ${reason}`)
        ctx.reply({embeds:[resultEmbed]})
      }catch(e){
        ctx.reply({embeds:[errEmbed]});
        console.error(`⚠️: ${e}`);
      }
    } else if (ctx.opitons.getSubcommand() === "unban") {
      try{
        const bans = ctx.guild.bans
        await bans.remove(member).then((unbannedUser)=>{
          
          console.log(`UNBANNED ${unbannedUser.username}`)
          resultEmbed.setDescription(`**UNBANNED** ${member}\n**REASON:** ${reason}`)
          ctx.reply({embeds:[resultEmbed]})
        }).catch(e=>console.error(`⚠️: ${e}`))
      }catch(e){
        ctx.reply({embeds:[errEmbed]});
        console.error(`⚠️: ${e}`);
      }
    } else if (ctx.opitons.getSubcommand() === "mute") {
    } else if (ctx.opitons.getSubcommand() === "unmute") {
    }
  },
};
