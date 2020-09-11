/** File containing all server command functions. */
import { readFileSync } from "fs";
// Read all commands from commands json file and convert them to js object.
const commands = JSON.parse(
  readFileSync("src/commands/commands.json", "utf-8")
);
/**
 * Function that checks if the message to discord is of command type.
 * @param message Users message.
 */
export function isMessageCommand(message) {
  const messageCommands = getMessageCommands();
  for (let messageCommand of messageCommands) {
    if (message.toString().startsWith(messageCommand)) return true;
  }
  return false;
}

/**
 * Returns a list with all greeting commands.
 */
export function getMessageCommands() {
  let messageCommands = [];
  Object.keys(commands).forEach((command) => {
    if (commands[command].type === "messageCommand") {
      messageCommands.push(command);
    }
  });
  return messageCommands;
}
