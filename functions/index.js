const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const { translateText, SUPPORTED_LANGUAGES } = require('my-language-translator');

exports.translate = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text input is required' });
      }

      const translations = {};
      for (const lang in SUPPORTED_LANGUAGES) {
        translations[SUPPORTED_LANGUAGES[lang]] = await translateText(text, lang);
      }

      res.json({ translations });
    } catch (error) {
      res.status(500).json({ error: 'Translation failed', details: error.message });
    }
  });
});
