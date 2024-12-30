import { useState } from 'react';

export default function App() {
  const [text, setText] = useState('');
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to translate.');
      return;
    }

    setError('');
    setLoading(true);
    setTranslations({});

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (response.ok) {
        setTranslations(data.translations);
      } else {
        setError(data.error || 'Failed to fetch translations');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Text Translator</h1>
        <p style={styles.subHeading}>Enter text and see translations in multiple languages.</p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          style={styles.textArea}
        />

        <button onClick={handleTranslate} style={styles.button}>
          {loading ? 'Translating...' : 'Translate'}
        </button>

        {error && <p style={styles.errorText}>{error}</p>}

        {Object.keys(translations).length > 0 && (
          <div style={styles.translationContainer}>
            <h2 style={styles.translationHeading}>Translations:</h2>
            <ul style={styles.translationList}>
              {Object.entries(translations).map(([language, translation]) => (
                <li key={language} style={styles.translationItem}>
                  <strong>{language}:</strong> {translation}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f7f9fc',
    padding: '20px',
  },
  card: {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    textAlign: 'center',
  },
  heading: {
    color: '#333333',
    fontSize: '2rem',
    marginBottom: '10px',
  },
  subHeading: {
    color: '#555555',
    marginBottom: '20px',
    fontSize: '1rem',
  },
  textArea: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    fontSize: '16px',
    resize: 'vertical',
    marginBottom: '20px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#0070f3',
    color: '#ffffff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  errorText: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  translationContainer: {
    marginTop: '30px',
    textAlign: 'left',
  },
  translationHeading: {
    fontSize: '1.2rem',
    color: '#333333',
    marginBottom: '15px',
  },
  translationList: {
    listStyle: 'none',
    paddingLeft: '0',
  },
  translationItem: {
    fontSize: '14px',
    marginBottom: '12px',
    color: '#555555',
  },
};

