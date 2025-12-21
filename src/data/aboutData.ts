import { interestData, achievements, getThemeColor } from "./commonData";

export const aboutPageData = {
  interests: [
    {
      icon: "FaRobot",
      name: interestData.robotics.name,
      description: interestData.robotics.description,
      colorKey: "primary",
      style: getThemeColor("primary"),
    },
    {
      icon: "FaRunning",
      name: interestData.athletics.name,
      description: interestData.athletics.description,
      colorKey: "success",
      style: getThemeColor("success"),
    },
    {
      icon: "FaPuzzlePiece",
      name: interestData.problemSolving.name,
      description: interestData.problemSolving.description,
      colorKey: "accent",
      style: getThemeColor("accent"),
    },
    {
      icon: "FaBullseye",
      name: interestData.mentoring.name,
      description: interestData.mentoring.description,
      colorKey: "danger",
      style: getThemeColor("danger"),
    },
  ],
  achievementStats: [
    {
      value: achievements.leetcode.rating,
      label: "LeetCode Rating",
      colorKey: "warning",
      style: getThemeColor("warning"),
    },
    {
      value: achievements.stats.totalProblemsSolved,
      label: "Problems Solved",
      colorKey: "success",
      style: getThemeColor("success"),
    },
    {
      value: achievements.stats.totalProjects,
      label: "Projects Built",
      colorKey: "primary",
      style: getThemeColor("primary"),
    },
    {
      value: achievements.leetcode.percentile,
      label: "LeetCode Percentile",
      colorKey: "accent",
      style: getThemeColor("accent"),
    },
  ],
};

export const pageInterests = [
  {
    icon: interestData.robotics.icon,
    name: interestData.robotics.name,
    description: interestData.robotics.description,
    color: interestData.robotics.color,
  },
  {
    icon: interestData.athletics.icon,
    name: interestData.athletics.name,
    description: interestData.athletics.description,
    color: interestData.athletics.color,
  },
  {
    icon: interestData.problemSolving.icon,
    name: interestData.problemSolving.name,
    description: interestData.problemSolving.description,
    color: interestData.problemSolving.color,
  },
  {
    icon: interestData.mentoring.icon,
    name: interestData.mentoring.name,
    description: interestData.mentoring.description,
    color: interestData.mentoring.color,
  },
];
