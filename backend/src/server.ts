import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware untuk parsing JSON
app.use(express.json());

// Contoh route
app.get('/api/notes', (req: Request, res: Response) => {
    res.json([{ id: 1, title: 'Note 1', content: 'This is the first note' }]);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});