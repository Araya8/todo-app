# Todo List Application

โปรเจกต์นี้ประกอบด้วย 2 ส่วนหลัก:

| ส่วน | เทคโนโลยี | โฟลเดอร์ |
|------|-----------|----------|
| Frontend | Vue.js 3 + TypeScript + Vite + Tailwind CSS | `frontend/` |
| Backend (RESTful API) | Express.js + TypeScript + PostgreSQL | `backend/` |


## สถาปัตยกรรมโดยรวม

```
[Vue 3 SPA] --HTTP(JSON)--> [Express API] --SQL--> [PostgreSQL]
   :5173                        :4000
```

Frontend เรียก API ทุกครั้งที่ผู้ใช้เพิ่ม/ลบ/ติ๊กเสร็จ todo — ไม่มีการเก็บข้อมูลไว้ที่ browser เพียงอย่างเดียว ดังนั้นเมื่อรีเฟรชหน้าเว็บ ข้อมูลจะถูกโหลดใหม่จาก API/ฐานข้อมูลเสมอ

## วิธีที่เร็วที่สุด: รันด้วย Docker (แนะนำ)

ถ้ามี [Docker Desktop](https://www.docker.com/products/docker-desktop/) ติดตั้งอยู่แล้ว ทั้งระบบ (PostgreSQL + Backend + Frontend) รันขึ้นมาได้ด้วยคำสั่งเดียว ไม่ต้องติดตั้ง Node.js หรือ PostgreSQL เองเลย:

```bash
cd todo-app
docker compose up --build
```

รอจน log ขึ้น `Todo API server running...` แล้วเปิดเบราว์เซอร์ไปที่ **http://localhost:5173**

- ฐานข้อมูลจะถูกสร้าง schema ให้อัตโนมัติทุกครั้งที่ container เริ่มทำงาน (idempotent — รันซ้ำไม่พัง)
- ข้อมูลจะถูกเก็บไว้ใน Docker volume (`db_data`) จะไม่หายแม้ปิด container แล้วเปิดใหม่
- กด `Ctrl+C` เพื่อหยุด และ `docker compose down` เพื่อล้าง container (เติม `-v` ถ้าต้องการล้างข้อมูลในฐานข้อมูลด้วย)

ถ้าไม่มี Docker หรืออยากรันแบบ manual (เห็น log แยกแต่ละส่วนชัดเจนกว่า เหมาะกับตอน develop) ทำตามขั้นตอนด้านล่างแทนได้ครับ

## เริ่มต้นใช้งานแบบ Manual (ไม่ใช้ Docker)

### ข้อกำหนดเบื้องต้น
- Node.js 18+
- PostgreSQL 14+ (ติดตั้งในเครื่อง)

### 1. เตรียมฐานข้อมูล
```bash
createdb todo_app
```

### 2. รัน Backend
```bash
cd backend
npm install
cp .env.example .env      # แก้ไขค่าการเชื่อมต่อ PostgreSQL ตามเครื่องของคุณ
npm run db:init           # สร้างตาราง todos
npm run dev                # http://localhost:4000
```

### 3. รัน Frontend
```bash
cd frontend
npm install
cp .env.example .env      # ปล่อยว่างไว้ได้สำหรับ local dev (ใช้ Vite proxy)
npm run dev                # http://localhost:5173
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173` — หน้าเว็บจะเรียกข้อมูลจาก backend ผ่าน `/api/*` (Vite proxy ไปที่ port 4000 ให้อัตโนมัติในโหมด dev)

รายละเอียดเพิ่มเติมของแต่ละส่วนดูได้ที่ `backend/README.md` และ (ด้านล่างของไฟล์นี้)

## ทดสอบ API ด้วย Postman

1. เปิด Postman → Import
2. เลือกไฟล์ `postman/Todo-API.postman_collection.json` และ `postman/Todo-API.postman_environment.json`
3. เลือก environment "Todo API - Local" แล้วกด Run เพื่อทดสอบทุก endpoint (Create, Read, Update, Delete พร้อม test assertions ในตัว)

## ฟีเจอร์ที่ทำครบตามโจทย์

- [x] เพิ่มรายการ todo
- [x] ลบรายการ todo
- [x] ทำเครื่องหมายรายการว่าเสร็จสิ้น
- [x] ออกแบบ UI ด้วย Tailwind CSS ให้ใช้งานง่ายและสวยงาม (ดีไซน์เฉพาะตัว ไม่ใช้เทมเพลตสำเร็จรูป)
- [x] Responsive ทั้ง Mobile และ Web
- [x] RESTful API รองรับ CRUD ครบถ้วน
- [x] ทุก action ส่ง request ไปยัง API และบันทึกลง PostgreSQL จริง
- [x] ข้อมูลคงอยู่หลังรีเฟรช (โหลดจาก API ทุกครั้งที่เปิดหน้า)
- [x] Postman collection พร้อม test assertions

## การอัปโหลดขึ้น GitHub

โปรเจกต์นี้จัดเป็น 2 โฟลเดอร์แยกกันในที่เก็บเดียว คุณสามารถ:

**ตัวเลือก A: แยกเป็น 2 repository (ตรงตามคำขอในโจทย์ที่ระบุ "ลิงก์ของ Repository ทั้งสอง")**
```bash
# Backend
cd backend
git init
git add .
git commit -m "Initial commit: Todo API server"
git branch -M main
git remote add origin https://github.com/<your-username>/todo-api-server.git
git push -u origin main

# Frontend
cd ../frontend
git init
git add .
git commit -m "Initial commit: Todo List frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/todo-list-frontend.git
git push -u origin main
```
อย่าลืมตั้งค่า repository ทั้งสองเป็น **Public** ใน GitHub Settings → General → Danger Zone → Change visibility

**ตัวเลือก B: รวมเป็น monorepo เดียว (repo เดียวมีทั้ง backend/ และ frontend/)**
```bash
cd todo-app
git init
git add .
git commit -m "Initial commit: Todo List app (frontend + backend)"
git branch -M main
git remote add origin https://github.com/<your-username>/todo-list-app.git
git push -u origin main
```

> หมายเหตุ: ไฟล์ `.env` และ `node_modules/` ถูกกำหนดไว้ใน `.gitignore` แล้ว จะไม่ถูกอัปโหลดขึ้น GitHub โดยอัตโนมัติ (ปลอดภัย ไม่หลุดรหัสผ่านฐานข้อมูล)

## โครงสร้างโปรเจกต์แบบเต็ม

```
todo-app/
├── backend/                 # Express.js + TypeScript + PostgreSQL
│   ├── src/
│   │   ├── db/               # connection pool, schema.sql, init script
│   │   ├── controllers/      # CRUD logic
│   │   ├── routes/           # /api/todos routes
│   │   └── index.ts          # entrypoint
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/                 # Vue 3 + TypeScript + Vite + Tailwind
│   ├── src/
│   │   ├── components/       # TodoInput, TodoItem, TodoList
│   │   ├── composables/      # useTodos.ts (state + API calls)
│   │   ├── services/         # api.ts (axios client)
│   │   ├── types/            # shared TS types
│   │   └── App.vue
│   ├── .env.example
│   └── package.json
├── postman/
│   ├── Todo-API.postman_collection.json
│   └── Todo-API.postman_environment.json
             
```
