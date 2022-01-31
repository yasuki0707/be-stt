import * as express from 'express';
import { speechToText } from '@/speechToText';
const app = express();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.get('/', async function (req: express.Request, res: express.Response) {
  const keywords = String(req.query.keywords).split(' ');
  console.log(keywords);
  const lang = req.query.lang as string;
  // console.log(keywords);
  const results = await speechToText(keywords, lang);
  res.send(results);
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
