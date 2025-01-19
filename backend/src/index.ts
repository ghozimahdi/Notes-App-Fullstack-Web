import express from 'express';
import exampleRoute from './routes/exampleRoute';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api', exampleRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});