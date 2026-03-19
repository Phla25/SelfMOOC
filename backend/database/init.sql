-- ENUM role
CREATE TYPE user_role AS ENUM (
    'STUDENT',
    'TEACHER',
    'PARENT'
);

-- bảng users (login)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(50) UNIQUE,
    password_hash TEXT NOT NULL,
    role user_role NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- đảm bảo phải có email hoặc username
    CONSTRAINT check_login
    CHECK (email IS NOT NULL OR username IS NOT NULL)
);

-- bảng teachers
CREATE TABLE teachers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    phone VARCHAR(20),
    subject VARCHAR(100)
);

-- bảng students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    dob DATE,
    link_code VARCHAR(20) UNIQUE NOT NULL
);

-- bảng parents
CREATE TABLE parents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20)
);

-- bảng liên kết parent - student
CREATE TABLE parent_student (
    parent_id INTEGER REFERENCES parents(id) ON DELETE CASCADE,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY(parent_id, student_id)
);

CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,

    sender_id INTEGER REFERENCES users(id) ON DELETE SET NULL,

    type VARCHAR(50), -- ví dụ: 'ABSENCE', 'SCORE', 'GENERAL'

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_receivers (
    id SERIAL PRIMARY KEY,
    notification_id INTEGER REFERENCES notifications(id) ON DELETE CASCADE,

    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,

    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);