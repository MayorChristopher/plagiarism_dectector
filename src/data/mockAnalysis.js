import React from 'react';

const sources = [
  { name: 'Academic Journal of Science', url: 'journalofscience.com/article/123' },
  { name: 'Global Tech Insights', url: 'globaltech.com/post/future-of-ai' },
  { name: 'History Uncovered Blog', url: 'historyuncovered.net/roman-empire' },
  { name: 'Digital Art Magazine', url: 'digitalartmag.com/p/impressionism' },
  { name: 'Wikipedia - Photosynthesis', url: 'en.wikipedia.org/wiki/Photosynthesis' },
  { name: 'Economics Today Review', url: 'econtoday.com/market-trends-2025' },
];

const sentences = [
  "The fundamental principles of quantum mechanics continue to challenge our understanding of the universe.",
  "Blockchain technology offers a decentralized and secure method for recording transactions across a peer-to-peer network.",
  "Renewable energy sources, such as solar and wind power, are crucial for mitigating the impacts of climate change.",
  "The Renaissance was a fervent period of European cultural, artistic, political and economic 'rebirth' following the Middle Ages.",
  "Machine learning models are trained on large datasets to recognize patterns and make predictions with increasing accuracy.",
  "The human brain is composed of billions of neurons that form a complex network of interconnected pathways.",
];

export const generateMockMatches = (wordCount) => {
  const numberOfMatches = Math.floor(Math.random() * 4) + 1;
  const matches = [];

  for (let i = 0; i < numberOfMatches; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    matches.push({
      id: i + 1,
      text: sentence,
      source: source.name,
      url: `https://${source.url}`,
      similarity: Math.floor(Math.random() * 40) + 60,
      type: Math.random() > 0.6 ? 'exact' : 'paraphrase',
    });
  }

  return matches;
};