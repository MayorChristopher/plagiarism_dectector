
// List of mock sources for demonstration
const sources = [
  { name: 'Academic Journal of Science', url: 'journalofscience.com/article/123' },
  { name: 'Global Tech Insights', url: 'globaltech.com/post/future-of-ai' },
  { name: 'History Uncovered Blog', url: 'historyuncovered.net/roman-empire' },
  { name: 'Digital Art Magazine', url: 'digitalartmag.com/p/impressionism' },
  { name: 'Wikipedia - Photosynthesis', url: 'en.wikipedia.org/wiki/Photosynthesis' },
  { name: 'Economics Today Review', url: 'econtoday.com/market-trends-2025' },
];

// Utility: simple string similarity (Jaccard index on words)
function jaccardSimilarity(str1, str2) {
  const set1 = new Set(str1.toLowerCase().split(/\W+/).filter(Boolean));
  const set2 = new Set(str2.toLowerCase().split(/\W+/).filter(Boolean));
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}


// For backward compatibility: mock match generator (DEPRECATED, but exported for legacy code)
export const generateMockMatches = (wordCount) => {
  const numberOfMatches = Math.floor(Math.random() * 4) + 1;
  const matches = [];
  for (let i = 0; i < numberOfMatches; i++) {
    const source = sources[Math.floor(Math.random() * sources.length)];
    matches.push({
      id: i + 1,
      text: `Sample matched text ${i + 1}`,
      source: source.name,
      url: `https://${source.url}`,
      similarity: Math.floor(Math.random() * 40) + 60,
      type: Math.random() > 0.6 ? 'exact' : 'paraphrase',
    });
  }
  return matches;
};

// Main function: analyze document text against sources
// Accepts: documentText (string)
// Returns: array of matches with details
export const analyzeDocumentForPlagiarism = (documentText) => {
  if (!documentText || typeof documentText !== 'string') return [];
  const sentences = documentText.match(/[^.!?]+[.!?]+/g) || [documentText];
  const matches = [];
  let matchId = 1;

  for (const sentence of sentences) {
    let bestMatch = null;
    let bestScore = 0;
    let bestSource = null;
    // Compare sentence to each source (using mock source text)
    for (const source of sources) {
      // For demo, use source name as mock content
      const sourceText = source.name;
      const score = jaccardSimilarity(sentence, sourceText);
      if (score > bestScore) {
        bestScore = score;
        bestSource = source;
      }
    }
    // If similarity is above a threshold, consider it a match
    if (bestScore > 0.2) {
      matches.push({
        id: matchId++,
        text: sentence.trim(),
        source: bestSource.name,
        url: `https://${bestSource.url}`,
        similarity: Math.round(bestScore * 100),
        type: bestScore > 0.7 ? 'exact' : 'paraphrase',
      });
    }
  }
  return matches;
};