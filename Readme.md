---
generator: Riched20 10.0.19041
---

**Nomor 1 :**

Desain Arsitektur Aplikasi Task Manager

Aplikasi menggunakan arsitektur sederhana client-server dengan
pemisahan:

Frontend (SPA) , Backend API , Database Relasional

Gambaran Umum

Komponen Utama

A. Frontend

Teknologi :

HTML , CSS ,JavaScript

Fungsi :

Menampilkan UI , Mengirim request API , Menyimpan token login ,
Menampilkan data task

File Utama :

login.html , index.html

B. Backend API

Teknologi:

Node.js , Express.js

Fungsi:

Menyediakan REST API , Proses autentikasi , Validasi request , CRUD Task
, Menghubungkan frontend dengan database

Struktur File :

backend/ , server.js ,routes/ , middleware/ , config/ , controllers/

C. Database

Teknologi:

MySQL

Fungsi:

Menyimpan data user , Menyimpan data task ,Relasi antar data

Tabel :

Users, Tasks

Relasi

User -\> banyak task

**Alur Komunikasi Sistem**

A. Register User

User isi form register , Frontend kirim data JSON , Backend hash
password , Data disimpan ke MySQL

B. Login User

Frontend

Frontend -\> POST /api/auth/login -\> Backend -\> cek email & password
-\> MySQL

Jika berhasil: Backend -\> JWT Token -\> Frontend

C. Akses Task (Autentikasi JWT)

Saat user membuka daftar task:

Frontend -\> GET /api/tasks -\> Authorization: Bearer TOKEN -\> Backend

Middleware JWT:

authMiddleware.js

akan:

memvalidasi token lalu mengambil data user login . Jika token valid:
request dilanjutkan Jika tidak valid: 401 Unauthorized

6\. CRUD Task

Tambah Task Frontend POST /api/tasks , Lihat Task Frontend GET
/api/tasks , Delete Task

DELETE /api/tasks/:id

**Nomor 2 :**

CREATE DATABASE task_manager;

CREATE TABLE users (

id INT AUTO_INCREMENT PRIMARY KEY,

name VARCHAR(100),

email VARCHAR(100) UNIQUE,

password VARCHAR(255),

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE tasks (

id INT AUTO_INCREMENT PRIMARY KEY,

user_id INT,

title VARCHAR(255),

description TEXT,

status ENUM(\'todo\', \'in-progress\', \'done\') DEFAULT \'todo\',

due_date DATE,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

);

**Nomor 3 :**

Aplikasi Task Manager menggunakan arsitektur REST API dengan format data
JSON.

Base URL: <http://localhost:3000/api>

1\. Endpoint Authentication

Endpoint ini digunakan untuk registrasi dan login user.

A. Register User -\> POST /api/auth/register

B. Login User -\> POST /api/auth/login

2\. Endpoint Task Management

A. Get All Tasks -\> GET /api/tasks

B. Create Task -\> POST /api/tasks

E. Delete Task -\> DELETE /api/tasks/:id

**NOmor 4 :**

1\. Bagian yang Cocok Menggunakan Node.js

A. REST API CRUD

Login , Register , CRUD Task , Dashboard , Validasi form

Alasan

Cepat dikembangkan , Node.js sangat cocok untuk:=rapid development
karena syntax sederhana , ecosystem NPM sangat besar , banyak library
siap pakai

2\. Bagian yang Cocok Menggunakan Go

Go lebih cocok untuk bagian:

Background Worker , reminder due date , scheduler , email notification ,
cron job

Alasan concurrency menggunakan goroutine Go bisa menjalankan ribuan
proses ringan dengan memory kecil.

**Nomor 5 :**

Strategi Dasar Testing untuk Aplikasi Task Manager

Testing dilakukan untuk memastikan endpoint API berjalan dengan benar,
aman, dan sesuai requirement.

Fokus utama testing:

Authentication , CRUD Task , Authorization , Validasi Data
