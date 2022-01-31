import { checkAudioLocale } from '@/modules/CheckAudioLocale';
import { checkAudioSize } from '@/modules/CheckAudioSize';
import { convertSpeechToText } from '@/modules/ConvertSpeechToText';
import { processText } from '@/modules/ProcessText';

require('dotenv').config();

export const speechToText = async (keyWords: string[], lang: string) => {
  // const audioFile = process.argv[2];
  const audioFile =
    lang === 'ja'
      ? './resources/audio/public_audio_ja-JP_Broadband-sample.wav'
      : './resources/audio/public_audio_en-US_Broadband-sample.wav';
  if (!audioFile) {
    console.log('オーディオファイルが指定されていません。');
    return;
  }
  if (!(await checkAudioSize(audioFile))) {
    console.log(`オーディオファイルのサイズが${process.env.AUDIO_FILE_SIZE_MAX}MBを超えています。`);
    return;
  }

  // keyWords to search within text converted from audio data
  // const keyWords = process.argv.slice(3);
  if (!keyWords.length) {
    console.log('検索単語が指定されていません。');
    return;
  }

  // convert audio data to text
  const text = await convertSpeechToText(audioFile);
  if (!text) {
    console.log('オーディオファイルをテキストに変換できませんでした。');
    return;
  }

  // check if audio data is right for Japanese
  // this could be acheived using natural language understanding
  // by processing converted text with this feature, we can judge statistically this is for Japanese or not
  // if (!(await checkAudioLocale(text, 'ja_JP'))) {
  //   console.log('指定されたオーディオファイルは日本語音声でない可能性が高いです。');
  // }

  // process text so that requirements are met
  const processedText = processText(text, keyWords);
  if (!processedText.length) {
    console.log('検索単語が検出されませんでした。');
    return { processedText: [], length: 0 };
  }

  return { processedText, length: text.length };
};
