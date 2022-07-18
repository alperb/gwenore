import { config } from 'dotenv';
import express from 'express';
import MongoAdapter from './gwenore/database/connection';

import Gwenore from './gwenore/gwenore';
import Logger from './gwenore/logger/logger';
import { LOGTYPE } from './types/log';

config();

const app = express();
MongoAdapter.connect().then(async () => {
    await Gwenore.init();
    app.listen(process.env.PORT, () => {
        Logger.log(LOGTYPE.INFO, `Server started on :${process.env.PORT}`);
    })
})


