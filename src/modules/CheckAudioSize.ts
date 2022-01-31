import * as fs from 'fs';
import * as path from 'path';

/**
 *
 * @param audioFile path of audio file
 * @returns whether the size of audio file is smaller than designated value.
 */
export const checkAudioSize = async (audioFile: string): Promise<Boolean> => {
  const AUDIO_FILE_SIZE_MAX = Number(process.env.AUDIO_FILE_SIZE_MAX);

  const pathToFile = path.resolve(audioFile);
  const stats = fs.statSync(pathToFile);
  const fileSize = stats.size / (1024 * 1024);

  return fileSize < AUDIO_FILE_SIZE_MAX;
};
