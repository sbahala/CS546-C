// Set-Up Routes
import {Router} from 'express';
const router = Router();

import path from 'path';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
router
  .route('/')
  .get(async (req, res) => {
    //code here for GET to show static HTML flie
    res.sendFile(path.resolve(__dirname,"../static/webpage.html"))
  })
  export default router;
