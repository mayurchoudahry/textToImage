import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateImage = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev',
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer' // Specify that the response is binary data
        }
      );

      // Convert binary data to a Blob and then create a URL for it
      const imageBlob = new Blob([response.data], { type: 'image/jpeg' }); // Adjust the type if necessary
      const imageObjectURL = URL.createObjectURL(imageBlob);
      
      setImageUrl(imageObjectURL);
    } catch (err) {
      console.error('Error details:', err.response || err);
      setError('An error occurred while generating the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Text to Image Generator</h1>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here"
      />
      <button onClick={handleGenerateImage} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" style={{ marginTop: '20px', maxWidth: '100%' }} />}
    </div>
  );
}

export default App;
