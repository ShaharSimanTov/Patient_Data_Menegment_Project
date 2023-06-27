const { Configuration, OpenAIApi } = require("openai");
 
const configuration = new Configuration({
  apiKey:'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',
});
 
const openai = new OpenAIApi(configuration);

const checkIt = async (question) => {
  let messages = [
        { role: 'user', content: question }
      ];
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });
    const jsonString = JSON.stringify(completion.data.choices[0].message.content);
    return (jsonString);
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
 
module.exports = { checkIt };
