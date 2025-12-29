import { Interest } from "./types";
import { FaRobot, FaRunning, FaPuzzlePiece, FaBullseye } from "react-icons/fa";

export const interests: Interest[] = [
  {
    id: "robotics",
    name: "Robotics",
    description: "Building combat & soccer bots",
    icon: FaRobot,
    color: "text-primary",
  },
  {
    id: "athletics",
    name: "Athletics",
    description: "Bronze in 50m Hurdles",
    icon: FaRunning,
    color: "text-accent",
  },
  {
    id: "competitive-programming",
    name: "Competitive Programming",
    description: "LeetCode, Codeforces & more",
    icon: FaPuzzlePiece,
    color: "text-warning",
  },
  {
    id: "mentoring",
    name: "Mentoring",
    description: "Leading workshops",
    icon: FaBullseye,
    color: "text-destructive",
  },
];
