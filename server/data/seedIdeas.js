const ideas = [
    {
      title: "Personal Finance Tracker",
      description: "A web app to track your income, expenses, and savings goals with visual charts.",
      difficulty: "Beginner",
      stack: ["React", "Node", "Express", "MongoDB"],
      category: "Web",
      features: [
        "Add income and expense entries",
        "View monthly summary",
        "Simple pie chart for spending",
        "Delete or edit entries"
      ],
      bonusChallenges: [
        "Add user authentication",
        "Export data as CSV",
        "Set monthly budget limits with alerts"
      ]
    },
    {
      title: "AI Recipe Generator",
      description: "Enter ingredients you have and get AI-powered recipe suggestions.",
      difficulty: "Intermediate",
      stack: ["React", "Node", "Express", "OpenAI API"],
      category: "AI",
      features: [
        "Input multiple ingredients",
        "Fetch recipe from OpenAI",
        "Display recipe with steps",
        "Save favourite recipes"
      ],
      bonusChallenges: [
        "Add dietary filter (vegan, keto)",
        "Generate a shopping list",
        "Rate and review saved recipes"
      ]
    },
    {
      title: "Multiplayer Quiz Game",
      description: "A real-time quiz game where players compete in live rooms.",
      difficulty: "Advanced",
      stack: ["React", "Node", "Express", "MongoDB", "Socket.io"],
      category: "Game",
      features: [
        "Create and join quiz rooms",
        "Real-time score updates",
        "Timer per question",
        "Leaderboard at end"
      ],
      bonusChallenges: [
        "Add custom question sets",
        "Voice countdown timer",
        "Spectator mode"
      ]
    },
    {
      title: "Dev Portfolio Builder",
      description: "A drag-and-drop portfolio website builder for developers.",
      difficulty: "Intermediate",
      stack: ["React", "Node", "Express", "MongoDB"],
      category: "Web",
      features: [
        "Choose from templates",
        "Add projects and skills",
        "Live preview mode",
        "Export as static HTML"
      ],
      bonusChallenges: [
        "Custom domain support",
        "Dark/light theme toggle",
        "Analytics dashboard"
      ]
    },
    {
      title: "CLI Task Manager",
      description: "A command-line tool to manage your daily tasks with priorities.",
      difficulty: "Beginner",
      stack: ["Node.js"],
      category: "CLI",
      features: [
        "Add, list, complete tasks",
        "Set priority levels",
        "Filter by status",
        "Save tasks in a JSON file"
      ],
      bonusChallenges: [
        "Add due dates with reminders",
        "Colourful terminal output",
        "Sync with a REST API"
      ]
    },
    {
      title: "Mood Journal with Insights",
      description: "A journaling app that tracks your daily mood and shows patterns over time.",
      difficulty: "Intermediate",
      stack: ["React", "Node", "Express", "MongoDB"],
      category: "Web",
      features: [
        "Daily mood entry with emoji selector",
        "Write journal notes",
        "Weekly mood graph",
        "Search past entries"
      ],
      bonusChallenges: [
        "AI-generated mood summary",
        "Streak tracking",
        "Reminder notifications"
      ]
    }
  ];
  
  module.exports = ideas;