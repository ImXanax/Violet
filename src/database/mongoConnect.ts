import chalk from "chalk";
import mongoose from "mongoose";

export async function mongoConnect() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/bug")
    .then(() => {})
    .catch((err) => console.error(err));
}

mongoose.connection.on("connecting", () => {
  console.log("🔃 DB Connecting...");
});
mongoose.connection.on("connected", () => {
  console.log("🟦 DB Connected");
});
mongoose.connection.on("disconnected", () => {
  console.log("❌ Database");
});
mongoose.connection.on("error", () => {
  console.log("⛔ Database");
});
