const courses = [
  {
    id: 1,
    title: "JavaScript",
    description: "Master JavaScript fundamentals",
    level: "Beginner",

    lessons: [
      {
        id: 1,
        title: "Variables and Data Types",
        content:
          "Variables are used to store and work with values in JavaScript.",

        quiz: {
          question:
            "Which keyword can be used to declare a variable in JavaScript?",
          options: ["var", "print", "echo", "define"],
          answer: "var",
          explanation:
            "var is a JavaScript keyword that can be used to declare a variable.",
        },
      },

      {
        id: 2,
        title: "Functions",
        content:
          "Functions are reusable blocks of JavaScript code.",

        quiz: {
          question: "Which keyword is commonly used to declare a function?",
          options: ["function", "method", "define", "func"],
          answer: "function",
          explanation:
            "The function keyword is commonly used to declare a function in JavaScript.",
        },
      },

      {
        id: 3,
        title: "Arrays and Objects",
        content:
          "Arrays store collections of values and objects store related data.",

        quiz: {
          question:
            "Which data structure stores values using key-value pairs?",
          options: ["Object", "Array", "String", "Number"],
          answer: "Object",
          explanation:
            "Objects store related data using key-value pairs.",
        },
      },

      {
        id: 4,
        title: "map, filter and find",
        content:
          "These array methods allow us to transform, filter and search data.",

        quiz: {
          question:
            "Which array method creates a new array by transforming each element?",
          options: ["map", "filter", "find", "forEach"],
          answer: "map",
          explanation:
            "map creates a new array by applying a function to each element.",
        },
      },

      {
        id: 5,
        title: "Async JavaScript",
        content:
          "Asynchronous JavaScript allows operations such as API requests to happen without blocking the application.",

        quiz: {
          question:
            "Which keyword is used to declare an asynchronous function?",
          options: ["async", "await", "promise", "defer"],
          answer: "async",
          explanation:
            "The async keyword is used to declare an asynchronous function.",
        },
      },

      {
        id: 6,
        title: "Promises and async/await",
        content:
          "Promises represent future results, while async/await provides a cleaner way to work with asynchronous operations.",

        quiz: {
          question:
            "Which keyword is normally used inside an async function to wait for a Promise?",
          options: ["await", "async", "wait", "pause"],
          answer: "await",
          explanation:
            "The await keyword pauses execution inside an async function until the Promise settles.",
        },
      },
    ],
  },
];

module.exports = courses;