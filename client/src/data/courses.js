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
  question: "Which keyword can be used to declare a variable in JavaScript?",
  options: ["var", "print", "echo", "define"],
  answer: "var",
  explanation:
    "var is a JavaScript keyword that can be used to declare a variable."
}
      },
      {
        id: 2,
        title: "Functions",
        content:
          "Functions are reusable blocks of JavaScript code.",
           quiz: {
    question: "Which keyword is commonly used to declare a function?",
    options: ["function", "method", "define", "func"],
    answer: "function"
  }
      },
      {
        id: 3,
        title: "Arrays and Objects",
        content:
          "Arrays store collections of values and objects store related data.",
           quiz: {
    question: "Which data structure stores values using key-value pairs?",
    options: ["Object", "Array", "String", "Number"],
    answer: "Object"
  }
          
      },
      {
        id: 4,
        title: "map, filter and find",
        content:
          "These array methods allow us to transform, filter and search data.",
            quiz: {
    question: "Which array method creates a new array by transforming each element?",
    options: ["map", "filter", "find", "forEach"],
    answer: "map"
  }
      },
      {
        id: 5,
        title: "Async JavaScript",
        content:
          "Asynchronous JavaScript allows operations such as API requests to happen without blocking the application.",
          quiz: {
    question: "Which keyword is used to declare an asynchronous function?",
    options: ["async", "await", "promise", "defer"],
    answer: "async"
  }
      },
      {
        id: 6,
        title: "Promises and async/await",
        content:
          "Promises represent future results, while async/await provides a cleaner way to work with asynchronous operations.",
           quiz: {
    question: "Which keyword is normally used inside an async function to wait for a Promise?",
    options: ["await", "async", "wait", "pause"],
    answer: "await"
  }
      }
    ]
  },

  {
    id: 2,
    title: "React",
    description: "Build modern interfaces with React",
    level: "Intermediate",
    lessons: [
      {
        id: 1,
        title: "Components",
        content:
          "Components are reusable pieces of a React application."
      },
      {
        id: 2,
        title: "Props",
        content:
          "Props allow a parent component to send data to a child component."
      },
      {
        id: 3,
        title: "State",
        content:
          "State allows a component to remember data between renders."
      },
      {
        id: 4,
        title: "useEffect",
        content:
          "useEffect is used to perform side effects in a React component."
      },
      {
        id: 5,
        title: "Forms",
        content:
          "React forms allow us to collect and manage user input."
      },
      {
        id: 6,
        title: "React Router",
        content:
          "React Router allows us to create navigation between different pages."
      }
    ]
  },

  {
    id: 3,
    title: "Node.js",
    description: "Build REST APIs with Node.js",
    level: "Beginner",
    lessons: [
      {
        id: 1,
        title: "Node.js Basics",
        content:
          "Node.js allows JavaScript to run outside the browser using the V8 JavaScript engine."
      },
      {
        id: 2,
        title: "Modules",
        content:
          "Modules allow us to organize Node.js code into separate reusable files."
      },
      {
        id: 3,
        title: "Express",
        content:
          "Express is a Node.js framework commonly used to build web servers and REST APIs."
      },
      {
        id: 4,
        title: "REST APIs",
        content:
          "REST APIs allow applications to communicate with a backend using HTTP methods such as GET, POST, PUT and DELETE."
      },
      {
        id: 5,
        title: "Middleware",
        content:
          "Middleware functions run between receiving a request and sending a response."
      },
      {
        id: 6,
        title: "MongoDB with Node.js",
        content:
          "Node.js applications can connect to MongoDB to store and retrieve application data."
      }
    ]
  },

  {
    id: 4,
    title: "MongoDB",
    description: "Store application data",
    level: "Beginner",
    lessons: [
      {
        id: 1,
        title: "MongoDB Basics",
        content:
          "MongoDB is a NoSQL database that stores data as documents inside collections."
      },
      {
        id: 2,
        title: "Collections",
        content:
          "A collection is a group of MongoDB documents."
      },
      {
        id: 3,
        title: "Documents",
        content:
          "MongoDB stores individual records as documents using a JSON-like BSON structure."
      },
      {
        id: 4,
        title: "CRUD Operations",
        content:
          "CRUD stands for Create, Read, Update and Delete."
      },
      {
        id: 5,
        title: "Queries",
        content:
          "MongoDB queries allow us to find documents based on specific conditions."
      },
      {
        id: 6,
        title: "MongoDB with Node.js",
        content:
          "Node.js applications can use MongoDB to persist application data."
      }
    ]
  }
];

export default courses;