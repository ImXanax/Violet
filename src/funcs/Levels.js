const mongoose = require("mongoose");
const levelSchema = require("../schema/levelSchema");
var mongoURL;

class Levels {
  //SET URL
  /**
   * @param {string} [mongoURL] - A mongoDB database URI.
   */
  static async mongoURL(url) {
    if (!url) throw new TypeError(`a url wasn't provided`);
    mongoURL = url;
    return mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  //CREATING USER
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   */
  static async createUser(userId, guildId) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    const isUser = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (isUser) return false;

    const newUser = new levelSchema({
      userID: userId,
      guildID: guildId,
    });

    await newUser
      .save()
      .catch((e) => console.error(`ERR IN CREATING USER: ${e}`));
    return newUser;
  }

  //DELETING USER
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   */
  static async deleteUser(userId, guildId) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    //user
    const u = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!u) return false;

    await levelSchema
      .findAndDeleteOne({ userID: userId, guildID: guildId })
      .catch((e) => console.error(`ERR IN DELETING USER: ${e}`));

    return u;
  }

  //ADDING XP
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [xp] - amount of xp to increase.
   */
  static async addXp(userId, guildId, xp) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!xp || xp == 0 || isNaN(parseInt(xp)))
      throw new TypeError(`invalid XP amount`);

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) {
      const newUser = new levelSchema({
        userID: userId,
        guildID: guildId,
        xp: xp,
        level: Math.floor(0.1 * Math.sqrt(xp)),
      });
      await newUser
        .save()
        .catch((e) => console.error(`ERR IN SAVING NEW USER ${e}`));
      return Math.floor(0.1 * Math.sqrt(xp)) > 0;
    }

    user.xp += parseInt(xp, 10);
    user.level = Math.floor(0.1 * Math.sqrt(user.xp));
    user.lastUpdated = new Date();
    await user.save().catch((e) => console.error(`ERR IN ADDING XP: ${e}`));
    return Math.floor(0.1 * Math.sqrt((user.xp -= xp))) < user.level;
  }

  //ADDING LEVEL
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [levels] - the amount of levels to add.
   */
  static async addLevel(userId, guildId, levels) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!levels) throw new TypeError(`levels wasn't provided`);

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.level += parseInt(level, 10);
    user.xp += user.level * user.level * 100;
    user.lastUpdated = new Date();

    user.save().catch((e) => console.error(`ERR IN ADDING LEVEL: ${e}`));
    return user;
  }

  //SETTING XP
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [xp] - the amount of xp to be set.
   */
  static async setXp(userId, guildId, xp) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!xp || xp == 0 || isNaN(parseInt(xp)))
      throw new TypeError(`invalid XP amount`);
    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.xp = xp;
    user.level = Math.floor(0.1 * Math.sqrt(xp));
    user.lastUpdated = new Date();

    user.save().catch((e) => console.error(`ERR IN SETTING XP: ${e}`));
    return user;
  }

  //SETTING LEVEL
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [levels] - the amount of levels to be set.
   */
  static async setLevel(userId, guildId, levels) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!levels) throw new TypeError(`levels wasn't provided`);

    const user = levelSchema.findOne({ userID: userId, guildID: guildId });
    if (!user) return false;

    user.level = levels;
    user.xp = user.level * user.level * 100;
    user.lastUpdated = new Date();

    user.save().catch((e) => console.error(`ERR IN SETTING LEVEL: ${e}`));
    return user;
  }

  //FETCH
  /**
   * @param {string} [userId] - Discord user id.
   * @param {string} [guildId] - Discord guild id.
   */

  static async fetch(userId, guildId, fetchPosition = false) {
    if (!userId) throw new TypeError("An user id was not provided.");
    if (!guildId) throw new TypeError("A guild id was not provided.");

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    if (fetchPosition === true) {
      const leaderboard = await levelSchema
        .find({
          guildID: guildId,
        })
        .sort([["xp", "descending"]])
        .exec();

      user.position = leaderboard.findIndex((i) => i.userID === userId) + 1;
    }

    /* To be used with canvacord or displaying xp in a pretier fashion, with each level the cleanXp stats from 0 and goes until cleanNextLevelXp when user levels up and gets back to 0 then the cleanNextLevelXp is re-calculated */
    user.cleanXp = user.xp - this.xpFor(user.level);
    user.cleanNextLevelXp = this.xpFor(user.level + 1) - this.xpFor(user.level);

    return user;
  }

  //SUBTRACTING XP
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [xp] - amount of xp you want subtracted.
   */
  static async subXp(userId, guildId, xp) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!xp || xp == 0 || isNaN(parseInt(xp)))
      throw new TypeError(`invalid XP amount`);

    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;
    user.xp -= xp;
    user.level = Math.floor(0.1 * Math.sqrt(user.xp));
    user.lastUpdated = new Date();
    user.save().catch((e) => console.error(`ERR in subtracting xp: ${e}`));
    return user;
  }

  //SUBTRACING LEVEL
  /**
   * @param {string} [userId] - the user's Id.
   * @param {string} [guildId] - the user's server Id.
   * @param {number} [level] - amount of level you want subtracted.
   */
  static async subLevel(userId, guildId, level) {
    if (!userId) throw new TypeError(`userId wasn't provided`);
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!levels) throw new TypeError(`levels wasn't provided`);
    const user = await levelSchema.findOne({
      userID: userId,
      guildID: guildId,
    });
    if (!user) return false;

    user.level -= level;
    user.xp = user.level * user.level * 100;
    user.lastUpdated = new Date();

    user.save().catch((e) => console.error(`ERR in subtracting level: ${e}`));

    return user;
  }

  //GETTING LEADERBOARD
  /**
   * @param {string} [guildId] - the user's guild Id.
   * @param {number} [limit] - the limit for the search.
   */
  static async getLb(guildId, limit) {
    if (!guildId) throw new TypeError(`guildId wasn't provided`);
    if (!limit) throw new TypeError(`a limit wasn't provided`);

    let allUser = await levelSchema
      .find({ guildID: guildId })
      .sort([["xp", "descending"]])
      .exec();

    return allUser.slice(0, limit);
  }

  //CALCULATING XP
  /*
   * @param {number} [targetLevel] - Xp required to reach that level.
   */
  static xpFor(targetLevel) {
    if (isNaN(targetLevel) || isNaN(parseInt(targetLevel, 10)))
      throw new TypeError("Target level should be a valid number.");
    if (isNaN(targetLevel)) targetLevel = parseInt(targetLevel, 10);
    if (targetLevel < 0)
      throw new RangeError("Target level should be a positive number.");
    return targetLevel * targetLevel * 100;
  }

  //CALCULATING LEADERBOARD
  /**
   * @param {string} [client] - the discord client.
   * @param {array} [leaderboard] - output of getLb.
   */

  static async calLd(client, ld, getUsers = false) {
    if (!client) throw new TypeError("client wasn't provided.");
    if (!ld) throw new TypeError("leaderboard's ID wasn't provided.");

    if (ld.length < 1) return [];

    const computedArray = [];

    if (getUsers) {
      for (const key of ld) {
        const user = (await client.users.fetch(key.userID)) || {
          username: "Unknown",
          discriminator: "0000",
        };
        computedArray.push({
          guildID: key.guildID,
          userID: key.userID,
          xp: key.xp,
          level: key.level,
          position:
            ld.findIndex(
              (i) => i.guildID === key.guildID && i.userID === key.userID
            ) + 1,
          username: user.username,
          discriminator: user.discriminator,
        });
      }
    } else {
      ld.map((key) =>
        computedArray.push({
          guildID: key.guildID,
          userID: key.userID,
          xp: key.xp,
          level: key.level,
          position:
            ld.findIndex(
              (i) => i.guildID === key.guildID && i.userID === key.userID
            ) + 1,
          username: client.users.cache.get(key.userID)
            ? client.users.cache.get(key.userID).username
            : "Unknown",
          discriminator: client.users.cache.get(key.userID)
            ? client.users.cache.get(key.userID).discriminator
            : "0000",
        })
      );
    }

    return computedArray;
  }
}

module.exports = Levels;
