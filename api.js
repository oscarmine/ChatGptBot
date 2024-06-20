const axios = require("axios");

async function chatbot(msg) {

    const options = {
        method: 'POST',
        url: 'https://infinite-gpt.p.rapidapi.com/infinite-gpt',
        headers: {
            'x-rapidapi-key': '347f506701mshc5ce3199af1ed3cp15b34djsn1d02e7d565ca',
            'x-rapidapi-host': 'infinite-gpt.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            query: msg,
            sysMsg: msg
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.msg;
    } catch (error) {
        console.error(error);
        
    }
}
module.exports = chatbot
