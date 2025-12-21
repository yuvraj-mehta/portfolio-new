export const education = [
  {
    level: "Bachelor of Technology",
    title: "B.Tech in Computer Science and Engineering",
    institution: "National Institute of Technology, Patna",
    location: "Patna, Bihar",
    duration: "2023 - 2027",
    status: "current",
    cgpa: "7.68/10",
    activities: [
      "Class Representative for CSE Department",
      "Member of Technical Club",
      "Competitive Programming Participant",
    ],
    courses: [
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Operating Systems",
      "Computer Networks",
      "Artificial Intelligence",
    ],
    achievements: [
      "Maintaining CGPA of 7.68/10",
      "Class Representative for CSE Department",
      "MUN Best Delegate Award",
    ],
  },
  {
    level: "Higher Secondary",
    title: "Class XII (CBSE)",
    institution: "Pragya Bharti Public School, Gaya",
    location: "Gaya, Bihar",
    duration: "2021 - 2022",
    status: "completed",
    percentage: "88.88%",
    activities: [],
    courses: [
      "Physics",
      "Chemistry",
      "Mathematics",
      "English",
      "Physical Education",
    ],
    achievements: ["Scored 88.88% in CBSE Class 12", "School Merit List"],
  },
  {
    level: "Secondary",
    title: "Class X (CBSE)",
    institution: "Pragya Bharti Public School, Gaya",
    location: "Gaya, Bihar",
    duration: "2019 - 2020",
    status: "completed",
    percentage: "91%",
    activities: [
      "Science Exhibitions",
      "Sports Competitions",
      "Debate Competitions",
    ],
    courses: [
      "Science",
      "Mathematics",
      "Social Studies",
      "English",
      "Sanskrit",
      "Information Technology",
    ],
    achievements: ["Scored 91% in CBSE Class 10"],
  },
];

export const educationTimeline = [
  {
    id: 0,
    status: "Currently Pursuing",
    type: "Bachelor of Technology",
    period: "2023 - 2027",
    institution: "National Institute of Technology, Patna",
    degree: "B.Tech in Computer Science and Engineering",
    location: "Patna, Bihar",
    description:
      "Pursuing comprehensive computer science education with focus on algorithms, data structures, and modern software development practices. Active participant in technical clubs and research projects.",
    keyPoints: {
      courses: [
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
      ],
      achievements: [
        "Maintaining CGPA of 7.68/10",
        "Merit List Recognition",
        "Technical Workshop Facilitation",
        "Competitive Programming Participant",
      ],
      activities: [
        { role: "Class Representative", detail: "CSE Department" },
        {
          role: "Competitive Programming Participant",
          detail: "Multiple Contests",
        },
        {
          role: "Robotics Club Member",
          detail: "Building Combat & Soccer Bots",
        },
        { role: "MUN 2023", detail: "Best Delegate Award" },
      ],
    },
  },
  {
    id: 1,
    type: "Higher Secondary",
    period: "2021 - 2022",
    institution: "Pragya Bharti Public School, Gaya",
    degree: "Class XII (CBSE)",
    location: "Gaya, Bihar",
    description:
      "Completed higher secondary education with focus on science and mathematics subjects.",
    keyPoints: {
      courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
      achievements: [
        "Scored 88.8% in CBSE Class 12",
        "School Merit List",
        "Perfect Attendance",
        "Academic Excellence Award",
      ],
    },
  },
  {
    id: 2,
    type: "Secondary",
    period: "2019 - 2020",
    institution: "Pragya Bharti Public School, Gaya",
    degree: "Class X (CBSE)",
    location: "Gaya, Bihar",
    description:
      "Completed secondary education with strong foundation in core subjects.",
    keyPoints: {
      courses: ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
      achievements: [
        "Scored 90% in CBSE Class 10",
        "Academic Excellence Award",
      ],
    },
  },
];

export const certifications = [
  {
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    year: "2024",
    description:
      "Comprehensive full-stack web development course covering HTML, CSS, JavaScript, complete MERN stack, and deployment.",
    featured: true,
    category: "technical",
  },
];

export const certificationsList = [
  {
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    year: "2023",
    description:
      "Comprehensive full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js",
    badge: "FaGlobe",
    colorStyle: { color: "hsl(var(--primary))" },
  },
];
