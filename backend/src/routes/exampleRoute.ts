import {Router, Request, Response} from 'express';

const router = Router();

router.get('/', (_: Request, res: Response) => {
    res.json({message: 'Hello from exampleRoute!'});
});

router.post('/', (req: Request, res: Response) => {
    const {name, age} = req.body;
    res.json({message: `Received data for ${name}, age ${age}`});
});

router.get('/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    res.json({message: `Fetching details for ID: ${id}`});
});

export default router;