import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2, BookOpen, ClipboardList, UserCircle, Star } from 'lucide-react';

const Dashboard = () => {
  const { user: rawUser, loading } = useAuth();
  const user = rawUser?.user || rawUser;
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Mock stats fetch
    setTimeout(() => {
      setStats({
        quizzesCreated: 5,
        questionsAdded: 20,
        attemptsMade: 8,
        averageScore: 84,
        rating: 4.2,
      });
    }, 600);
  }, []);

  const isStudent = user?.user_type === 'student';
  const isTeacher = user?.user_type === 'teacher';
  const isAdmin = user?.user_type === 'admin';

  if (loading || !user || !stats) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Profile Card */}
      <div className="card shadow-xl bg-base-100 border border-base-300">
        <div className="card-body flex flex-col md:flex-row gap-6 items-center">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`} alt="avatar" />
            </div>
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm opacity-80">{user.username} • {user.email}</p>
            {user.user_type === 'student' && (
              <p className="text-sm text-gray-500">
                {user.school} • Class {user.class} - {user.section}
              </p>
            )}
            <span className="badge badge-outline capitalize mt-2">{user.user_type}</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isTeacher && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body flex items-center gap-4">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <p className="text-sm text-gray-500">Quizzes Created</p>
                <p className="text-xl font-semibold">{stats.quizzesCreated}</p>
              </div>
            </div>
          </div>
        )}

        {isTeacher && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body flex items-center gap-4">
              <ClipboardList className="w-8 h-8 text-success" />
              <div>
                <p className="text-sm text-gray-500">Questions Added</p>
                <p className="text-xl font-semibold">{stats.questionsAdded}</p>
              </div>
            </div>
          </div>
        )}

        {(isStudent || isAdmin) && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body flex items-center gap-4">
              <UserCircle className="w-8 h-8 text-info" />
              <div>
                <p className="text-sm text-gray-500">Quiz Attempts</p>
                <p className="text-xl font-semibold">{stats.attemptsMade}</p>
              </div>
            </div>
          </div>
        )}

        {isStudent && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body flex items-center gap-4">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-500">Avg. Score</p>
                <p className="text-xl font-semibold">{stats.averageScore}%</p>
              </div>
            </div>
          </div>
        )}

        {isStudent && (
          <div className="card bg-base-200 shadow-md">
            <div className="card-body flex items-center gap-4">
              <Star className="w-8 h-8 text-warning" />
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="text-xl font-semibold">{stats.rating} / 5</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
