import React from "react";
import { Star, StarHalf, StarOff } from "lucide-react";

// Profile card component
const ProfileCard = ({
  name = "Aryan Sharma",
  username = "@aryansharma",
  school = "Random Public School",
  classInfo = "Class 10 • Section C",
  avatarUrl = "https://api.dicebear.com/7.x/thumbs/svg?seed=Student",
  rating = 3.5,
  quizzesTaken = 42,
  questionsAttempted = 380,
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stats shadow-lg bg-base-200 rounded-box flex flex-col flex-wrap sm:flex-row justify-between items-center p-4 gap-4">
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


// Submenu card
const HomeCard = ({ title, icon, desc }) => {
  return (
    <div className="card h-40 bg-base-200 shadow-md hover:shadow-xl transition cursor-pointer">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
          </svg>
          <h2 className="card-title">{title}</h2>
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
};

// Main home component
const HomePage = () => {
  const menuItems = [
    {
      title: "My Quizzes",
      icon: "M12 20h9M12 4h9M4 8h16M4 16h16M4 12h16",
      desc: "Access and manage all quizzes you've taken or created.",
    },
    {
      title: "My Stats",
      icon: "M3 3v18h18M7 13l3 3 7-7",
      desc: "Track your quiz performance and progress over time.",
    },
    {
      title: "My Groups",
      icon:
        "M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m5-4a4 4 0 110-8 4 4 0 010 8zm6 4a4 4 0 100-8 4 4 0 000 8zM3 10a4 4 0 100-8 4 4 0 000 8z",
      desc: "Join, create or manage your study groups and collaborations.",
    },
    {
      title: "Notifications",
      icon:
        "M15 17h5l-1.405-1.405C18.79 15.21 19 14.112 19 13V9c0-3.866-3.582-7-8-7S3 5.134 3 9v4c0 1.112.21 2.21.605 3.195L2 17h5m5 0v1a3 3 0 006 0v-1m-6 0H9",
      desc: "View important alerts and updates about your activity.",
    },
    {
      title: "Settings",
      icon: "M12 8v4l3 3m6-2a9 9 0 11-18 0 9 9 0 0118 0z",
      desc: "Customize your preferences and account configurations.",
    },
    {
      title: "Help & Feedback",
      icon: "M8 10h.01M12 14h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      desc: "Reach out for support or share your suggestions.",
    },
  ];

  return (
    <div className="p-4">
      <ProfileCard />

      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {menuItems.map((item, index) => (
          <HomeCard key={index} title={item.title} icon={item.icon} desc={item.desc} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
