import { ColorResolvable } from "discord.js";

export class X {
  // Method to generate a random alphanumeric string of given length
  static generateRandomString(length: number): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }
  static hex: { [key: string]: ColorResolvable } = {
    primary: "#5a51e0",
    secondary: "#3a87da",
    fail: "#df3c2d",
  };
}
