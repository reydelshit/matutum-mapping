import express, { Application, Request, Response } from 'express';
import routes from './routes';
import cors from 'cors';
import { inventoryRouter } from './api/inventory';
import { graveRouter } from './api/grave';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/inventory', inventoryRouter);
app.use('/api/grave', graveRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Express + TypeScript API');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
