import { Command } from "./Command";
import { Cat } from "./commands/Cat";
import { Ping } from "./commands/Ping";
import { Sub } from "./commands/Sub";
import { Weather } from "./commands/Weather";


export const Commands: Command[] = [Cat, Ping, Sub, Weather];
