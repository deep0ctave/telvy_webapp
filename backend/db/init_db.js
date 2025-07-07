// backend/db/init_db.js

const pool = require('./client');

async function main() {
  try {
    console.log("🔧 Creating tables...");

    await pool.query(`
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
        data JSONB,
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
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        submitted_at TIMESTAMP,
        completed_at TIMESTAMP,
        time_taken INTEGER,
        score INTEGER DEFAULT 0,
        status VARCHAR(20) DEFAULT 'in_progress',
        is_completed BOOLEAN DEFAULT FALSE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


      CREATE TABLE IF NOT EXISTS question_attempts (
        id BIGSERIAL PRIMARY KEY,
        quiz_attempt_id BIGINT NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
        question_id BIGINT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
        selected_option_id BIGINT REFERENCES options(id),
        typed_answer TEXT,
        is_correct BOOLEAN,
        time_taken INTERVAL,
        attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (quiz_attempt_id, question_id)
      );


      CREATE TABLE IF NOT EXISTS user_sessions (
        id SERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        refresh_token TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id BIGSERIAL PRIMARY KEY,
        user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
        token TEXT NOT NULL,
        is_used BOOLEAN DEFAULT FALSE,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );


    `);

    console.log("✅ Tables created. ");

    //Add seed data here

    console.log("✅ Done. Database initialized and populated.");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await pool.end();
    console.log("🔌 DB connection closed.");
  }
}

main();
