import express , {Request, Response, NextFunction}  from "express";
import todoRouts from './routes/todo';
import { json } from "body-parser";


const app = express()
app.use(json());

app.use('/todos', todoRouts);

app.use ((err: Error, req: Request, res: Response, next: NextFunction )=> {
    res.status(500).json({message: err.message})

})

app.listen(3000)



