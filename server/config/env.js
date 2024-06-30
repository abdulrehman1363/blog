require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  OPEN_AI_CHAT_COMPLETION_URL: "https://api.openai.com/v1/chat/completions",
  OPEN_AI_KEY: process.env.OPEN_AI_KEY || "sk-proj-B4daJOErMo698sqcZdAhT3BlbkFJMkHAfBzNuq2dHdI8Vk6m"
};