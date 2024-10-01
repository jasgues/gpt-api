import express from 'express';
import GPT4js from 'gpt4js';

import fs from 'fs';
import path from 'path';

const app = express();
const port = 3004;
const messages = [];
const options = {
  provider: "Nextway",
  model: "gpt-4o-free",
};

const provider = GPT4js.createProvider(options.provider);

app.use(express.json());

app.get('/', async (req, res) => {
  const userInput = req.query.param;

  if (!userInput) {
    return res.status(400).json({ error: 'Parametre eksik' });
  }

  try {
    messages.push({ role: "user", content: userInput });
    const response = await provider.chatCompletion(messages, options);
    
    // Yanıtı dosyaya yaz
    const filePath = path.join('', 'responses.txt');
    fs.appendFileSync(filePath, `Input: ${userInput}\nOutput: ${response}\n`);
    fs.appendFileSync(filePath, `#########\n`);


    //console.log(' log: '+response);
    return res.json({ 'response': response });

    

    
  } catch (error) {
    console.error("Hata:", error);
    return res.status(500).json({ error: 'Sunucu hatası', details: error.message });
  }
});

// Sunucu başlat
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor.`);
});