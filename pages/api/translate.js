// pages/api/translate.js

import { translateText, SUPPORTED_LANGUAGES } from 'my-language-translator'; // Replace with the correct import if needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
      }

      // Translate text into all supported languages
      const translations = {};
      for (const lang in SUPPORTED_LANGUAGES) {
        translations[SUPPORTED_LANGUAGES[lang]] = await translateText(text, lang);
      }

      return res.status(200).json({ translations });
    } catch (error) {
      return res.status(500).json({ error: 'Translation failed', details: error.message });
    }
  } else {
    // Handle other HTTP methods if necessary (e.g., GET)
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
