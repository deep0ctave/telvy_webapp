require('dotenv').config();

const { Client } = require('pg');

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function main() {
  await client.connect();
  console.log("🔧 Creating tables...");

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGSERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE,
      phone TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      gender TEXT,
      dob DATE,
      school TEXT,
      class TEXT,
      section TEXT,
      user_type TEXT CHECK (user_type IN ('student', 'teacher', 'admin')) NOT NULL,
      is_verified BOOLEAN DEFAULT FALSE,
      status TEXT DEFAULT 'active',
      profile_image TEXT,
      language TEXT DEFAULT 'en',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS otp_verifications (
      id BIGSERIAL PRIMARY KEY,
      phone TEXT NOT NULL,
      otp TEXT NOT NULL,
      is_used BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expires_at TIMESTAMP NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_stats (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      questions_attempted INTEGER DEFAULT 0,
      quizzes_attempted INTEGER DEFAULT 0,
      total_time INTERVAL DEFAULT INTERVAL '0',
      success_rate REAL DEFAULT 0.0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS questions (
      id BIGSERIAL PRIMARY KEY,
      question_text TEXT NOT NULL,
      question_image TEXT,
      question_type TEXT CHECK (question_type IN ('mcq', 'true_false', 'type_in')) NOT NULL,
      tags TEXT[],
      owner_id BIGINT REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS options (
      id BIGSERIAL PRIMARY KEY,
      question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
      option_text TEXT NOT NULL,
      is_correct BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS accepted_answers (
      id BIGSERIAL PRIMARY KEY,
      question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
      acceptable_answer TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quizzes (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      time_limit INTEGER NOT NULL,
      quiz_type TEXT CHECK (quiz_type IN ('live', 'scheduled', 'anytime')) NOT NULL,
      tags TEXT[],
      owner_id BIGINT REFERENCES users(id),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quiz_questions (
      id BIGSERIAL PRIMARY KEY,
      quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
      question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
      question_order INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
      started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      submitted_at TIMESTAMP,
      score REAL,
      is_completed BOOLEAN DEFAULT FALSE,
      time_taken INTERVAL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS question_attempts (
      id BIGSERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      quiz_id BIGINT REFERENCES quizzes(id) ON DELETE CASCADE,
      question_id BIGINT REFERENCES questions(id) ON DELETE CASCADE,
      selected_option_id BIGINT REFERENCES options(id),
      typed_answer TEXT,
      is_correct BOOLEAN,
      time_taken INTERVAL,
      attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("✅ Tables created. Inserting dummy data...");

  await client.query(`
    INSERT INTO users (username, email, phone, password, name, gender, dob, school, class, section, user_type, is_verified)
    VALUES 
    ('user1', 'user1@mail.com', '+911234567891', 'hashedpassword1', 'User 1', 'male', '2010-01-01', 'Village School', '6', 'A', 'student', TRUE),
    ('user2', 'user2@mail.com', '+911234567892', 'hashedpassword2', 'User 2', 'male', '2010-01-02', 'Village School', '6', 'A', 'teacher', TRUE),
    ('user3', 'user3@mail.com', '+911234567893', 'hashedpassword3', 'User 3', 'male', '2010-01-03', 'Village School', '6', 'A', 'admin', TRUE);
  `);

  await client.query(`
    INSERT INTO questions (question_text, question_type, tags, owner_id)
    VALUES 
    ('What is 2 + 2?', 'mcq', ARRAY['math', 'grade_6'], 2),
    ('Is the earth flat?', 'true_false', ARRAY['science'], 2),
    ('What is the capital of India?', 'type_in', ARRAY['geography'], 2);
  `);

  await client.query(`
    INSERT INTO options (question_id, option_text, is_correct)
    VALUES
    (1, '3', false),
    (1, '4', true),
    (1, '5', false),
    (1, '22', false),
    (2, 'True', false),
    (2, 'False', true);
  `);

  await client.query(`
    INSERT INTO accepted_answers (question_id, acceptable_answer)
    VALUES
    (3, 'new delhi'),
    (3, 'delhi');
  `);

  await client.query(`
    INSERT INTO quizzes (title, description, time_limit, quiz_type, owner_id)
    VALUES 
    ('Basic Knowledge Quiz', 'A simple test for demonstration.', 10, 'anytime', 2);
  `);

  await client.query(`
    INSERT INTO quiz_questions (quiz_id, question_id, question_order)
    VALUES
    (1, 1, 1),
    (1, 2, 2),
    (1, 3, 3);
  `);

  await client.query(`
    INSERT INTO quiz_attempts (user_id, quiz_id, started_at, submitted_at, score, is_completed, time_taken)
    VALUES 
    (1, 1, CURRENT_TIMESTAMP - INTERVAL '5 minutes', CURRENT_TIMESTAMP, 2.0, TRUE, INTERVAL '5 minutes');
  `);

  await client.query(`
    INSERT INTO question_attempts (user_id, quiz_id, question_id, selected_option_id, typed_answer, is_correct, time_taken)
    VALUES
    (1, 1, 1, 2, NULL, TRUE, INTERVAL '00:01:00'),
    (1, 1, 2, 6, NULL, TRUE, INTERVAL '00:01:00'),
    (1, 1, 3, NULL, 'Delhi', TRUE, INTERVAL '00:02:00');
  `);

  await client.end();
  console.log("✅ Done. Database initialized and populated.");
}

main().catch(err => {
  console.error("❌ Error:", err);
  client.end();
});
