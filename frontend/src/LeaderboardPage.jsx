import React from 'react';

const leaderboardData = [
  {
    name: 'Hart Hagerty',
    country: 'United States',
    attempted: 120,
    correct: 96,
    img: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
  },
  {
    name: 'Brice Swyre',
    country: 'China',
    attempted: 150,
    correct: 120,
    img: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
  },
  {
    name: 'Marjy Ferencz',
    country: 'Russia',
    attempted: 100,
    correct: 80,
    img: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
  },
  {
    name: 'Yancy Tear',
    country: 'Brazil',
    attempted: 90,
    correct: 81,
    img: 'https://img.daisyui.com/images/profile/demo/5@94.webp',
  },
];

export default function Leaderboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🏆 Quiz Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* Table head */}
          <thead>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Attempted</th>
              <th>Correct</th>
              <th>Success Rate</th>
              <th></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {leaderboardData.map((student, index) => {
              const successRate = ((student.correct / student.attempted) * 100).toFixed(1);
              return (
                <tr key={index}>
                  <td className="font-bold">{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={student.img} alt={student.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{student.name}</div>
                        <div className="text-sm opacity-50">{student.country}</div>
                      </div>
                    </div>
                  </td>
                  <td>{student.attempted}</td>
                  <td>{student.correct}</td>
                  <td>
                    <span
                      className={`badge ${
                        successRate >= 90
                          ? 'badge-success'
                          : successRate >= 75
                          ? 'badge-warning'
                          : 'badge-error'
                      }`}
                    >
                      {successRate}%
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-ghost btn-xs">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Table foot */}
          <tfoot>
            <tr>
              <th>Rank</th>
              <th>Student</th>
              <th>Attempted</th>
              <th>Correct</th>
              <th>Success Rate</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
