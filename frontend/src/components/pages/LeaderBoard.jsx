import React, { useEffect, useState } from "react";
import { Trophy, Loader2 } from "lucide-react";

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching leaderboard
  useEffect(() => {
    setTimeout(() => {
      setLeaders([
        {
          id: 1,
          name: "Aryan Sharma",
          username: "aryan10",
          score: 98,
          school: "St. Xavier's",
          class: "10",
          section: "C",
        },
        {
          id: 2,
          name: "Sara Malik",
          username: "saram",
          score: 94,
          school: "Delhi Public School",
          class: "9",
          section: "A",
        },
        {
          id: 3,
          name: "Rahul Kumar",
          username: "rahulk",
          score: 92,
          school: "Model High School",
          class: "10",
          section: "B",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Trophy className="w-8 h-8 text-yellow-400" />
        <h1 className="text-3xl font-bold">Leaderboard</h1>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <Loader2 className="animate-spin w-6 h-6 text-primary" />
        </div>
      ) : leaders.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <Trophy className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p>No leaderboard data yet. Try attempting a quiz!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra table-md bg-base-100 rounded-box shadow">
            <thead>
              <tr className="text-sm text-base-content/70">
                <th>Rank</th>
                <th>Student</th>
                <th>Score</th>
                <th>School</th>
                <th>Class</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((user, index) => (
                <tr key={user.id}>
                  <td className="font-bold">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user.username}`}
                            alt={user.name}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-sm opacity-60">@{user.username}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.score}</td>
                  <td>{user.school}</td>
                  <td>
                    Class {user.class} • {user.section}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
