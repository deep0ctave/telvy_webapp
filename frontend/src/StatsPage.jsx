import React, { useState } from "react";
import {
  Line,
  Doughnut,
  Bar
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend
);

const ranges = {
  "Past Week": {
    attempted: 120,
    correct: 90,
    time: "6h 45m",
    streak: 5,
    line: [15, 20, 18, 22, 17, 10, 18],
    activity: [25, 30, 10, 5], // MCQ, Subjective, Coding, Review
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  "Last Month": {
    attempted: 410,
    correct: 340,
    time: "27h 10m",
    streak: 14,
    line: [70, 80, 90, 85],
    activity: [110, 120, 90, 90],
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
  },
  "6 Months": {
    attempted: 2100,
    correct: 1800,
    time: "110h",
    streak: 47,
    line: [320, 380, 300, 290, 370, 340],
    activity: [500, 600, 480, 520],
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  },
  "1 Year": {
    attempted: 3500,
    correct: 2900,
    time: "240h",
    streak: 85,
    line: [280, 300, 320, 290, 310, 350, 300, 320, 330, 310, 340, 360],
    activity: [800, 900, 850, 950],
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
  },
  "All Time": {
    attempted: 4600,
    correct: 3900,
    time: "320h",
    streak: 120,
    line: [100, 300, 450, 500, 700, 900, 1200],
    activity: [1300, 1500, 1000, 800],
    labels: ["2019", "2020", "2021", "2022", "2023", "2024", "2025"],
  },
};

const StatsPage = () => {
  const [range, setRange] = useState("Past Week");
  const data = ranges[range];

  const lineData = {
    labels: data.labels,
    datasets: [
      {
        label: "Questions Attempted",
        data: data.line,
        fill: false,
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  const doughnutData = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Success Ratio",
        data: [data.correct, data.attempted - data.correct],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  const barData = {
    labels: ["MCQ", "Subjective", "Coding", "Review"],
    datasets: [
      {
        label: "Activity Type",
        data: data.activity,
        backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#3b82f6"],
      },
    ],
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Student Performance</h1>
        <select
          className="select select-bordered w-full max-w-xs"
          value={range}
          onChange={(e) => setRange(e.target.value)}
        >
          {Object.keys(ranges).map((key) => (
            <option key={key}>{key}</option>
          ))}
        </select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Questions Attempted</div>
            <div className="stat-value text-info">{data.attempted}</div>
            <div className="stat-desc">in {range}</div>
          </div>
        </div>
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Correct Answers</div>
            <div className="stat-value text-success">{data.correct}</div>
            <div className="stat-desc">
              Success Ratio: {((data.correct / data.attempted) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Time Studied</div>
            <div className="stat-value text-primary">{data.time}</div>
            <div className="stat-desc">Total across {range}</div>
          </div>
        </div>
        <div className="stats bg-base-100 shadow">
          <div className="stat">
            <div className="stat-title">Streak Days</div>
            <div className="stat-value text-warning">{data.streak}</div>
            <div className="stat-desc">🔥 Active streak!</div>
          </div>
        </div>
      </div>

      {/* Line Chart Full Row */}
      <div className="bg-base-200 p-10 rounded-box shadow">
        <h2 className="text-lg font-semibold mb-4">Questions Attempted Over Time</h2>
        <Line data={lineData} />
      </div>

      {/* Second row with Doughnut + Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-200 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-4">Success Ratio</h2>
          <Doughnut data={doughnutData} />
        </div>

        <div className="bg-base-200 p-4 rounded-box shadow">
          <h2 className="text-lg font-semibold mb-4">Activity Breakdown</h2>
          <Bar data={barData} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
