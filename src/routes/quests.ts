import express, {Response} from 'express';
import { TypedRequest } from '../types/http';
import { QuestCountRequest } from '../types/requests';
import Gwenore from '../gwenore/gwenore';

const quest_router = express.Router();

quest_router.post('/count', async (req: TypedRequest<QuestCountRequest>, res: Response) => {

    res.json();
})

export default quest_router;