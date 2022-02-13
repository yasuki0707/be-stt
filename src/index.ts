import * as express from 'express';
import * as fileUpload from 'express-fileupload';
import { TAudioFile } from '@/types/AudioFile';
import { speechToText } from '@/speechToText';
const app = express();

app.use(fileUpload());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.post('/', async function (req: express.Request, res: express.Response) {
  const keywords = String(req.query.keywords).split(' ');
  const lang = req.query.lang as string;
  const audioFile = req.files?.audio_file as TAudioFile;
  console.log(audioFile);
  const results = await speechToText(keywords, lang, audioFile);
  res.send(results);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
