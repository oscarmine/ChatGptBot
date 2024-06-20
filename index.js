const { Telegraf } = require("telegraf");
const chatbot = require("./api");
// const chatbot = require("./api");
// import {Telegraf, session, Markup} from 'telegraf';
// import { Stage } from 'telegraf/lib/scenes/stage';
require('dotenv').config()

const TOKEN = process.env.TOKEN;
const bot = new Telegraf(`${TOKEN}`);

bot.start((ctx) => {
    ctx.reply(`Hi ${ctx.chat.first_name}! how can i help you?`);
})

bot.on("message", async(ctx) => {
    const sentMessage = await ctx.reply('Thinking🤔')
    const req = await chatbot(ctx);
    if(typeof req === "undefined"){
        ctx.reply("Sorry, The bot has reached its daily request limit. Please try again tomorrow. \nSupport for speed up the bot,\nContact: @oscar_mine");
            try {
                await ctx.telegram.deleteMessage(ctx.chat.id, sentMessage.message_id);
            } catch (error) {
                console.error("Failed to delete message:", error);
            }
    }
    else{
        ctx.reply(req);
        setTimeout(async () => {
            try {
                await ctx.telegram.deleteMessage(ctx.chat.id, sentMessage.message_id);
            } catch (error) {
                console.error("Failed to delete message:", error);
            }
        }, 2000);
    }
})

bot.launch().then();