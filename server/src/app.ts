import express, { Request, Response } from "express";
import cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { connectMongoDB } from "./config/mongoConfig";
import mongoose from "mongoose";

import todoRoutes from './routes/todolist.routes'

dotenv.config({path: path.join(__dirname,"../development.env")})

const app = express(); 
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors()); 

app.use("/api/todos", todoRoutes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ 
        message: "Todo List API is running!", 
        endpoints: { 
            todos: "/api/todos" 
        } 
    });
});

app.get('/api', (req: Request, res: Response) => {
    // 1. ดึงค่าจาก Query Parameter 'data'
    const queryData = req.query.data;

    // 2. ตรวจสอบว่ามีค่า 'data' ใน Query Parameter หรือไม่
    if (queryData) {
        // 3. สร้างโครงสร้าง Response ตามที่กำหนด
        const responseData = [{
            data: queryData,
            status: 'success'
        }];

        // ส่ง Response กลับ
        return res.json(responseData);
    }

    // กรณีไม่มี Query Parameter 'data'
    return res.status(400).json({
        error: "กรุณาระบุ Query Parameter 'data' เช่น /api?data=example"
    });
});

app.listen(port, async() => {
    await connectMongoDB();

    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Test API: http://localhost:${port}/api?data=yes`);
});