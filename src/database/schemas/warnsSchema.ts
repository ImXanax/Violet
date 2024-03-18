import mongoose, { Model, InferSchemaType } from "mongoose";

const warnsSchema = new mongoose.Schema({
  warnId: {
    type: String,
    default: idGenerator,
  },
  userId: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const Warn = mongoose.model("Warn", warnsSchema);

type IWarn = InferSchemaType<typeof warnsSchema>;

function idGenerator(): string {
  const characters = "0123456789";
  let id = "";
  for (let i = 0; i < 10; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}
export default Warn;
