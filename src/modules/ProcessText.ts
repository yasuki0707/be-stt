import { TSearchedText } from '@/types/SearchedText';

// EXTENSION: if new logic is added, you can process text as you like with the same arguments
/**
 *
 * @param text text extracted from audio data to be processed for CSV
 * @param keyWords keywords to be searched in text
 * @returns data to be converted to CSV which consists user-defined items.
 */
export const processText = (text: string, keyWords: string[]): TSearchedText[] => {
  // get unique ketwords to avoid duplication
  const uniqueKeyWords = [...new Set(keyWords)];

  const foundKeyWords: TSearchedText[] = [];
  const n = text.length;
  console.log(`音声データのテキスト:${text}(${n})`);
  uniqueKeyWords.forEach((k) => {
    let i = 0;
    while (i < n) {
      const j = text.indexOf(k, i);
      if (j === -1) break;

      // limit pos within original text length
      const from = Math.max(j - 5, 0);
      const to = Math.min(j + k.length + 5, n);
      const redundantWord = text.substring(from, to);
      foundKeyWords.push({
        keyWord: k,
        pos: j + 1,
        redundantKeyWord: redundantWord
      });

      // next check should be starting from current position + 1 to skip already-searched part of original string
      i = j + 1;
    }
  });
  return foundKeyWords;
};
