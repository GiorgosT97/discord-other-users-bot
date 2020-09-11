const Discord = require("discord.js");
const client = new Discord.Client();

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
});

client.login(process.env.BOT_TOKEN);
