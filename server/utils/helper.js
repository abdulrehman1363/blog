const fs = require('fs');
const { OPEN_AI_CHAT_COMPLETION_URL } = require("../config/env") 

const generateChatRequestBody = (templatePath, replacements) => {
  const templateData = fs.readFileSync(templatePath, "utf8");

  let modifiedTemplateData = templateData;

  for (const placeholder in replacements) {
    if (replacements.hasOwnProperty(placeholder)) {
      modifiedTemplateData = modifiedTemplateData.replace(
        placeholder,
        replacements[placeholder]
      );
    }
  }

  const requestBody = JSON.parse(modifiedTemplateData);

  return requestBody;
};

module.exports = {
  generateChatRequestBody,
};
