import { Client } from "discord.js";
import { sendUserMessage, sanitizeMessage, addMessage } from "./messages";
import { isMessageCommand } from "./commands";
const client = new Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for new guild members
client.on("message", (message) => {
  if (
    message.mentions.users &&
    message.mentions.users.some((user) => user.discriminator === "0692")
  ) {
    const chanel = message.channel;
    chanel.send("Do not speak of Mitsos, he is not coming back.");
  }
  // If user types a command message.
  if (isMessageCommand(message)) {
    const { userMessage, type } = sanitizeMessage(message);
    addMessage(message.author, userMessage, type);
  }
});

/**
 * Someone changes his status.
 *
 */
client.on("presenceUpdate", (oldPresence, newPresence) => {
  // Check if previously user was connected.
  if (
    !oldPresence ||
    (oldPresence.status == "online" && newPresence.status == "offline") ||
    (oldPresence.status == "offline" && newPresence.status == "online")
  )
    // find channel and send message.
    client.channels.fetch("695637331495092348").then((koubentoulaChannel) => {
      sendUserMessage(newPresence.user, koubentoulaChannel, newPresence.status);
    });
});

/**
 * Server new member.
 */
client.on("guildMemberAdd", (member) => {
  client.channels.fetch("695637331495092348").then((koubentoulaChannel) => {
    koubentoulaChannel.send(
      `Hello my dear ${member.nickname}. Very happy to see you :). Welcome to the server!!`
    );
  });
});

/**
 * Server remove mebmer.
 */
client.on("guildMemberRemove", (member) => {
  client.channels.fetch("695637331495092348").then((koubentoulaChannel) => {
    koubentoulaChannel.send(
      `Seems like ${member.nickname} left, hope to see you soon.`
    );
  });
});

// ACTIVATE BOT.
client.login(process.env.BOT_TOKEN);
