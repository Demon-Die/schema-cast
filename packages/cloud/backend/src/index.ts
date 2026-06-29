import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { schemasRouter } from './routes/schemas';
import { teamsRouter } from './routes/teams';
import { billingRouter } from './routes/billing';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRouter);
app.use('/api/schemas', schemasRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/billing', billingRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`schema-cast backend running on port ${PORT}`);
});

export default app;
