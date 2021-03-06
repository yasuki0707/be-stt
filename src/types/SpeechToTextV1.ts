import SpeechToTextV1 = require('ibm-watson/speech-to-text/v1-generated');

export type TSpeechToTextResponse = SpeechToTextV1.Response<SpeechToTextV1.SpeechRecognitionResults>;

const AudioModel = SpeechToTextV1.RecognizeConstants.Model;

// get audio model depending on fileName
// when fileName includes "narrow" return narrowband model, otherwise broadband model
// TODO: this should be modified so that models for the other languages can be determined as well
//       also depending on fileName is unstable
/**
 *
 * @param fileName path of audio file
 * @returns model of audio file
 */
export const getAudioModel = (fileName: string, lang: string) => {
  // let bit = 0;
  // if (fileName.includes('Narrow')) bit |= 1 << 0;
  // if (lang === 'en') bit |= 1 << 1;
  if (lang === 'ja') return AudioModel.JA_JP_BROADBANDMODEL;
  // else if (bit === 1) return AudioModel.JA_JP_NARROWBANDMODEL;
  else if (lang === 'en') return AudioModel.EN_US_BROADBANDMODEL;
  else if (lang === 'ar') return AudioModel.AR_AR_BROADBANDMODEL;
  // else if (bit === 3) return AudioModel.EN_US_NARROWBANDMODEL;
};
