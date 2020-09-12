/** File containing all server message command functions. */
import { readFileSync, writeFileSync } from "fs";
import { getMessageCommands } from "../commands";
// Read all messages from messages json file and convert them to js object.
const messages = JSON.parse(
  readFileSync("src/messages/messages.json", "utf-8")
);

const typeToMessage = {
  online: "welcomeMessage",
  offline: "leaveMessage",
};
/**
 * Funtion that adds one message or updates accordingly.
 * @param user The user sent the message.
 * @param message The message the user wants to be dislpayed.
 * @param type The type of the message.
 */
export function addMessage(user, message, type) {
  const userTag = user.discriminator;
  messages[userTag][type] = message;
  writeFileSync("src/messages/messages.json", JSON.stringify(messages));
}

/**
 * Function that takes the discord message and returns the
 * message and type.
 * @param message Users message.
 * @returns message User's sanitized message
 * @returns type of the mssage.
 */
export function sanitizeMessage(message) {
  let type;
  let userMessage;
  if (message.toString().startsWith("!helloMessage")) {
    type = "welcomeMessage";
    userMessage = message.toString().split("!helloMessage ")[1];
  } else {
    type = "leaveMessage";
    userMessage = message.toString().split("!goodbyeMessage ")[1];
  }

  return { userMessage, type };
}

/**
 * Funtion that returns user according message.
 * @param user The user that sent the message.
 * @param type The type of the message.
 */
export function sendUserMessage(user, channel, type) {
  // Case where user has already add a message.
  const userTag = user.discriminator;
  if (
    Object.keys(messages).includes(userTag) &&
    messages[userTag][typeToMessage[type]]
  ) {
    channel.send(messages[userTag][typeToMessage[type]]);
  }
  // Case where user has not saved a message.
  else {
    channel.send(`${user.username} is now ${type}`);
  }
}
