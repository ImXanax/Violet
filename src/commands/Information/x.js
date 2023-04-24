const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  Message,
  Guild,
  MessageAttachment,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("x")
    .setDescription('=- > > ili |=- |=-   [l ili 1] .il ili [l')
    .addSubcommand((subcmd) =>
      subcmd
        .setName("decrypt")
        .setDescription("decrypts input")
        .addStringOption((option) =>
          option.setName("input").setDescription("the input").setRequired(true)
        )
    )
    .addSubcommand((subcmd) =>
      subcmd
        .setName("encrypt")
        .setDescription("encrypt input")
        .addStringOption((option) =>
          option.setName("input").setDescription("the input").setRequired(true)
        )
    ),
  async execute(ctx, client) {
    //CHK PERM
    if (ctx.member.id !== "413755451373518864") {
        return ctx.reply({content:'**1010 ERR**:\nYOU DONT HAVE PERMISSION TO USE THIS!'});
    }

    //DECRYPT
    if (ctx.options.getSubcommand() === "decrypt") {
      const msg = ctx.options.getString("input");
      const LAN = {
        "=-": "A",
        vv: "B",
        ">": "C",
        "[l": "D",
        ili: "E",
        "<i": "F",
        "[\\": "G",
        "l+": "H",
        ".il": "I",
        "[/": "J",
        "l-]": "K",
        "-l|": "L",
        "|l-": "M",
        "1]": "N",
        "<v>": "O",
        "}{": "P",
        "<->": "Q",
        "<1": "R",
        "|=-": "S",
        "][": "T",
        "|[": "U",
        "<.|": "V",
        "[-": "W",
        ">|<": "X",
        "]_": "Y",
        "]]": "Z",
        "l.l": "0",
        "l-l": "1",
        ll_: "2",
        "L-": "3",
        "-ll": "4",
        LL: "5",
        lLl: "6",
        Ll: "7",
        "-ll-": "8",
        "ll.": "9",
      };

      const decrypt = (m) => {
        
        return m
          .split("   ")
          .map((w) =>
            w
              .split(" ")
              .map((l) => LAN[l])
              .join("")
          )
          .join(" ")
          .trim();
      };
      const result = decrypt(msg);
      const resultEmbed = new MessageEmbed()
        .setDescription(`\`\`\`${result}\`\`\``)
        .setColor("#0014e9");
      ctx
        .reply({ embeds: [resultEmbed] })
        .then(() => console.log)
        .catch((e) => console.error(e));
    } //ENCRYPT
    else if (ctx.options.getSubcommand() === "encrypt") {
      const msg = ctx.options.getString("input");
      const LAN = {
        A: "=-",
        B: "vv",
        C: ">",
        D: "[l",
        E: "ili",
        F: "<i",
        G: "[\\",
        H: "l+",
        I: ".il",
        J: "[/",
        K: "l-]",
        L: "-l|",
        M: "|l-",
        N: "1]",
        O: "<v>",
        P: "}{",
        Q: "<->",
        R: "<1",
        S: "|=-",
        T: "][",
        U: "|[",
        V: "<.|",
        W: "[-",
        X: ">|<",
        Y: "]_",
        Z: "]]",
        0: "l.l",
        1: "l-l",
        2: "ll_",
        3: "L-",
        4: "-ll",
        5: "LL",
        6: "lLl",
        7: "Ll",
        8: "-ll-",
        9: "ll.",
      };
      const encrypt = (m) => {
        return m
          .split(" ")
          .map((char) =>
            char
              .split("")
              .map((letter) => LAN[letter.toUpperCase()])
              .join(" ")
          )
          .join("   ")
          .trim();
      };
      const result = encrypt(msg);
      const resultEmbed = new MessageEmbed()
        .setDescription(`\`\`\`${result}\`\`\``)
        .setColor("#0014e9");
      ctx
        .reply({ embeds: [resultEmbed] })
        .then(() => console.log)
        .catch((e) => console.error(e));
    }
  },
};
