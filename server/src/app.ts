import express, { Request, Response } from "express";

const app = express();  
const port = 5000;
app.use(express.json());

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
        error: "กรุณาระบุ Query Parameter 'data' เช่น /api/data?data=example"
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Test API: http://localhost:${port}/api/data?data=yes`);
});