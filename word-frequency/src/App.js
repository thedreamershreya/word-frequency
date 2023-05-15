import React, { useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function App() {
  const [wordFrequencies, setWordFrequencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const data = response.data;

      const wordCount = {};
      const words = data.split(/\s+/);
      words.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1;
      });

      const frequencies = Object.entries(wordCount)
        .map(([word, count]) => ({ word, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      setWordFrequencies(frequencies);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleExport = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + wordFrequencies.map((row) => `${row.word},${row.count}`).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'word_frequencies.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Submit'}
      </button>

      {wordFrequencies.length > 0 && (
        <>
          <h2>Word Frequencies</h2>
          <BarChart width={800} height={400} data={wordFrequencies}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>

          <button onClick={handleExport}>Export</button>
        </>
      )}
    </div>
  );
}

export default App;
