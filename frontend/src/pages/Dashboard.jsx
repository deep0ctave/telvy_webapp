import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // adjust path if needed

const ProfileCard = ({
  name,
  username,
  school,
  classInfo,
  avatarUrl,
  rating,
  quizzesTaken,
  questionsAttempted,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stats shadow-lg bg-base-200 rounded-box flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
      {/* Avatar & Info */}
      <div className="stat flex-1">
        <div className="stat-figure">
          <div className="avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={avatarUrl} alt="Avatar" />
            </div>
          </div>
        </div>
        <div className="stat-value text-xl font-bold">{name}</div>
        <div className="stat-title text-base-content/60">{username}</div>
        <div className="text-sm mt-2">{school}</div>
        <div className="text-sm">{classInfo}</div>
      </div>

      {/* Rating */}
      <div className="stat flex-1 items-center">
        <div className="stat-figure">
          <div className="flex gap-0.5 text-orange-400">
            {[...Array(fullStars)].map((_, i) => (
              <Star key={`full-${i}`} className="w-5 h-5 fill-current" />
            ))}
            {hasHalfStar && <StarHalf className="w-5 h-5 fill-current" />}
            {[...Array(emptyStars)].map((_, i) => (
              <StarOff key={`empty-${i}`} className="w-5 h-5 text-base-300" />
            ))}
          </div>
        </div>
        <div className="stat-title">Rating</div>
        <div className="stat-value">{rating}/5</div>
        <div className="stat-desc text-sm">Average</div>
      </div>

      {/* Quizzes Taken */}
      <div className="stat flex-1 items-center">
        <div className="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div className="stat-title">Quizzes Taken</div>
        <div className="stat-value text-primary">{quizzesTaken}</div>
        <div className="stat-desc">Across all subjects</div>
      </div>

      {/* Questions Attempted */}
      <div className="stat flex-1 items-center">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-4H5v4H3V5h2v4h4V5h2v12H9zM21 7h-6m0 0l3-3m-3 3l3 3" />
          </svg>
        </div>
        <div className="stat-title">Questions Attempted</div>
        <div className="stat-value text-secondary">{questionsAttempted}</div>
        <div className="stat-desc">Keep it up!</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-10">Loading user info...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user.name || user.username || "User"} 👋</h1>

      <ProfileCard
        name={user.name}
        username={`@${user.username}`}
        school={user.school || "Not specified"}
        classInfo={`Class ${user.class || "?"} • Section ${user.section || "?"}`}
        avatarUrl="https://api.dicebear.com/7.x/thumbs/svg?seed=Student"
        rating={4.2} // hardcoded for now
        quizzesTaken={12} // dummy value
        questionsAttempted={110} // dummy value
      />

      <div className="text-center opacity-60 pt-10 text-sm">
        More insights and admin panels coming soon...
      </div>
    </div>
  );
};

export default Dashboard;
