import { Router } from "express";
import userRouter from './userRouter'

const router = Router();

router.get('/health',(req,res)=>{
    res.json({status: 'ok'});
});

router.use('/user',userRouter);


export default router;