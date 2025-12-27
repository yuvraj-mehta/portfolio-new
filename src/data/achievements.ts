import { AchievementStats } from "./types";

export const achievements: AchievementStats = {
  leetcode: {
    rating: "1659",
    maxRating: "1693",
    problemsSolved: "371",
    globalRanking: "128980",
    percentile: "Top 16.4%",
  },
  codechef: {
    rating: "1451",
    maxRating: "1456",
    problemsSolved: "25",
    stars: "2★",
    division: "Div 3",
  },
  codeforces: {
    rating: "1030",
    maxRating: "1085",
    problemsSolved: "27",
    rank: "Newbie",
  },
  geeksforgeeks: {
    problemsSolved: "130",
    rank: "1058",
  },
  stats: {
    yearsExperience: "2+",
    commits: "500+",
    totalProblemsSolved: "500+",
  },
  awards: [
    {
      id: "award-mun-best-delegate",
      title: "Winner - Model United Nations",
      category: "competition",
      year: "2023",
      description:
        "Represented the Republic of Poland at NIT Patna's Model United Nations. Earned the Best Delegate award for exceptional debate skills and impactful resolutions.",
    },
    {
      id: "award-robotics-technical-member",
      title: "Technical Member",
      category: "technical",
      year: "2023 - Present",
      description:
        "Active member of the Robotics Club, led team building combat and soccer bots, organized workshops.",
    },
    {
      id: "award-class-representative",
      title: "Class Representative",
      category: "leadership",
      year: "2023 - 2024",
      description:
        "Coordinated between faculty and students, organized department events for 3 semesters.",
    },
    {
      id: "award-bronze-intramurals",
      title: "Bronze Medal - NIT Patna Intramurals",
      category: "sports",
      year: "2023",
      description: "Won Bronze in 50m Hurdles at the university sports event.",
    },
  ],
};
