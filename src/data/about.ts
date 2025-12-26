import { interests } from "./interests";
import { achievements } from "./achievements";
import { getThemeColor } from "./common";
import { projects } from "./projects";

const colorKeys = ["primary", "success", "accent", "danger"];

export const aboutPageData = {
  interests: interests.slice(0, 4).map((interest, index) => ({
    icon: interest.icon,
    name: interest.name,
    description: interest.description,
    colorKey: colorKeys[index],
    style: getThemeColor(colorKeys[index]),
  })),
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
      value: `${projects.length}`,
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

export const pageInterests = interests;
