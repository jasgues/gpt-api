import GPT4js from "gpt4js";
import readline from 'readline';

// Readline interface oluşturma
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const options = {
  provider: "DALLE2",
};

// Kullanıcıdan metin alma fonksiyonu
const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, resolve));
};

(async () => {
  const provider = GPT4js.createProvider(options.provider);

  try {
    while (true) { // Sonsuz döngü
      // Kullanıcıdan resim için tanımlama metni al
      const imageDescription = await askQuestion("Lütfen resim için bir tanımlama metni girin (Çıkmak için 'exit' yazın): ");

      // Kullanıcı çıkmak isterse döngüden çık
      if (imageDescription.toLowerCase() === 'exit' || imageDescription.toLowerCase() === 'çıkış') {
        console.log('Programdan çıkılıyor...');
        break;
      }

      // DALL-E sağlayıcısına metni gönderip resim oluştur
      const base64 = await provider.imageGeneration(imageDescription, options);
      
      console.log("Oluşturulan Resim Base64 Çıktısı:\n", base64);
    }
  } catch (error) {
    console.error("Hata:", error);
  } finally {
    rl.close(); // Readline arayüzünü kapat
  }
})();
