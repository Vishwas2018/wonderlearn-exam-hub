
// Sample exam data for the application

// Exam metadata
export const examData = [
  {
    id: "naplan-math-y5-sample",
    title: "NAPLAN Year 5 Mathematics - Sample",
    description: "Free sample practice exam for Year 5 Mathematics NAPLAN test",
    type: "free",
    category: "NAPLAN",
    subject: "Maths",
    yearLevel: 5,
    questionsCount: 10,
    timeMinutes: 20,
  },
  {
    id: "naplan-math-y5-full-1",
    title: "NAPLAN Year 5 Mathematics - Full Exam 1",
    description: "Comprehensive Year 5 Mathematics NAPLAN practice exam",
    type: "premium",
    category: "NAPLAN",
    subject: "Maths",
    yearLevel: 5,
    questionsCount: 30,
    timeMinutes: 50,
  },
  {
    id: "icas-science-y5-sample",
    title: "ICAS Year 5 Science - Sample",
    description: "Free sample practice exam for Year 5 Science ICAS test",
    type: "free",
    category: "ICAS",
    subject: "Science",
    yearLevel: 5,
    questionsCount: 8,
    timeMinutes: 15,
  },
  {
    id: "icas-science-y5-full-1",
    title: "ICAS Year 5 Science - Full Exam 1",
    description: "Comprehensive Year 5 Science ICAS practice exam",
    type: "premium",
    category: "ICAS",
    subject: "Science",
    yearLevel: 5,
    questionsCount: 25,
    timeMinutes: 45,
  },
  {
    id: "naplan-dt-y5-sample",
    title: "NAPLAN Year 5 Digital Technologies - Sample",
    description: "Free sample practice exam for Year 5 Digital Technologies NAPLAN test",
    type: "free",
    category: "NAPLAN",
    subject: "Digital Technologies",
    yearLevel: 5,
    questionsCount: 10,
    timeMinutes: 20,
  },
  {
    id: "icas-dt-y5-full-1",
    title: "ICAS Year 5 Digital Technologies - Full Exam 1",
    description: "Comprehensive Year 5 Digital Technologies ICAS practice exam",
    type: "premium",
    category: "ICAS",
    subject: "Digital Technologies",
    yearLevel: 5,
    questionsCount: 25,
    timeMinutes: 45,
  },
  {
    id: "naplan-math-y3-sample",
    title: "NAPLAN Year 3 Mathematics - Sample",
    description: "Free sample practice exam for Year 3 Mathematics NAPLAN test",
    type: "free",
    category: "NAPLAN",
    subject: "Maths",
    yearLevel: 3,
    questionsCount: 10,
    timeMinutes: 15,
  },
  {
    id: "naplan-math-y7-sample",
    title: "NAPLAN Year 7 Mathematics - Sample",
    description: "Free sample practice exam for Year 7 Mathematics NAPLAN test",
    type: "free",
    category: "NAPLAN",
    subject: "Maths",
    yearLevel: 7,
    questionsCount: 12,
    timeMinutes: 25,
  },
  {
    id: "icas-science-y7-sample",
    title: "ICAS Year 7 Science - Sample",
    description: "Free sample practice exam for Year 7 Science ICAS test",
    type: "free",
    category: "ICAS",
    subject: "Science",
    yearLevel: 7,
    questionsCount: 8,
    timeMinutes: 15,
  },
];

// Sample questions for each exam
export const examQuestions = {
  "naplan-math-y5-sample": [
    {
      id: 1,
      text: "What is 243 + 59?",
      type: "mcq",
      options: [
        { id: "a", text: "292" },
        { id: "b", text: "302" },
        { id: "c", text: "312" },
        { id: "d", text: "322" }
      ],
      correctAnswer: "b",
      explanation: "To add 243 and 59, we add the ones: 3 + 9 = 12, carry the 1. Then add the tens: 1 + 4 + 5 = 10, carry the 1. Then add the hundreds: 1 + 2 = 3. So 243 + 59 = 302."
    },
    {
      id: 2,
      text: "A rectangular garden has a length of 8 meters and a width of 5 meters. What is the area of the garden?",
      type: "mcq",
      options: [
        { id: "a", text: "13 square meters" },
        { id: "b", text: "26 square meters" },
        { id: "c", text: "40 square meters" },
        { id: "d", text: "64 square meters" }
      ],
      correctAnswer: "c",
      explanation: "To find the area of a rectangle, multiply length × width. So 8 meters × 5 meters = 40 square meters."
    },
    {
      id: 3,
      text: "Which of these fractions is equivalent to 1/2?",
      type: "mcq",
      options: [
        { id: "a", text: "2/6" },
        { id: "b", text: "3/6" },
        { id: "c", text: "2/5" },
        { id: "d", text: "5/10" }
      ],
      correctAnswer: "b",
      explanation: "1/2 = 3/6 because when we multiply both the numerator and denominator by 3, we get 3/6. This is equivalent to 1/2."
    },
    {
      id: 4,
      text: "If a train travels at 60 kilometers per hour, how far will it travel in 2.5 hours?",
      type: "mcq",
      options: [
        { id: "a", text: "120 kilometers" },
        { id: "b", text: "150 kilometers" },
        { id: "c", text: "180 kilometers" },
        { id: "d", text: "200 kilometers" }
      ],
      correctAnswer: "b",
      explanation: "To find distance, multiply speed by time: 60 km/h × 2.5 h = 150 km."
    },
    {
      id: 5,
      text: "Sarah has 24 marbles. She gives 1/3 of them to her friend. How many marbles does she have left?",
      type: "mcq",
      options: [
        { id: "a", text: "8 marbles" },
        { id: "b", text: "12 marbles" },
        { id: "c", text: "16 marbles" },
        { id: "d", text: "18 marbles" }
      ],
      correctAnswer: "c",
      explanation: "Sarah gives away 1/3 of 24 marbles, which is 24 ÷ 3 = 8 marbles. So she has 24 - 8 = 16 marbles left."
    },
    {
      id: 6,
      text: "What is the perimeter of a square with sides of 7 cm?",
      type: "mcq",
      options: [
        { id: "a", text: "14 cm" },
        { id: "b", text: "21 cm" },
        { id: "c", text: "28 cm" },
        { id: "d", text: "49 cm" }
      ],
      correctAnswer: "c",
      explanation: "The perimeter of a square is 4 times the length of one side. So 4 × 7 cm = 28 cm."
    },
    {
      id: 7,
      text: "Which number is divisible by both 2 and 3?",
      type: "mcq",
      options: [
        { id: "a", text: "15" },
        { id: "b", text: "22" },
        { id: "c", text: "24" },
        { id: "d", text: "25" }
      ],
      correctAnswer: "c",
      explanation: "A number is divisible by 2 if it's even (ends in 0, 2, 4, 6, or 8). A number is divisible by 3 if the sum of its digits is divisible by 3. In 24, 2+4=6, which is divisible by 3. So 24 is divisible by both 2 and 3."
    },
    {
      id: 8,
      text: "If the time is 3:45 PM, what will the time be in 2 hours and 30 minutes?",
      type: "mcq",
      options: [
        { id: "a", text: "5:15 PM" },
        { id: "b", text: "6:15 PM" },
        { id: "c", text: "6:25 PM" },
        { id: "d", text: "6:15 AM" }
      ],
      correctAnswer: "b",
      explanation: "3:45 PM + 2 hours = 5:45 PM. 5:45 PM + 30 minutes = 6:15 PM."
    },
    {
      id: 9,
      text: "What is the value of the underlined digit in the number 3,527?",
      type: "mcq",
      options: [
        { id: "a", text: "2" },
        { id: "b", text: "20" },
        { id: "c", text: "200" },
        { id: "d", text: "2000" }
      ],
      correctAnswer: "b",
      explanation: "In the number 3,527, the digit 2 is in the tens place, so its value is 20."
    },
    {
      id: 10,
      text: "If 3 pencils cost 90 cents, how much would 7 pencils cost?",
      type: "mcq",
      options: [
        { id: "a", text: "$1.90" },
        { id: "b", text: "$2.10" },
        { id: "c", text: "$2.30" },
        { id: "d", text: "$2.70" }
      ],
      correctAnswer: "b",
      explanation: "If 3 pencils cost 90 cents, then 1 pencil costs 90 ÷ 3 = 30 cents. So 7 pencils would cost 7 × 30 = 210 cents, which is $2.10."
    }
  ],
  "icas-science-y5-sample": [
    {
      id: 1,
      text: "Which of the following is NOT a property of air?",
      type: "mcq",
      options: [
        { id: "a", text: "It takes up space" },
        { id: "b", text: "It has weight" },
        { id: "c", text: "It is visible" },
        { id: "d", text: "It can be compressed" }
      ],
      correctAnswer: "c",
      explanation: "Air is invisible (not visible). It does take up space, has weight, and can be compressed."
    },
    {
      id: 2,
      text: "Plants make their own food through a process called:",
      type: "mcq",
      options: [
        { id: "a", text: "Respiration" },
        { id: "b", text: "Photosynthesis" },
        { id: "c", text: "Digestion" },
        { id: "d", text: "Decomposition" }
      ],
      correctAnswer: "b",
      explanation: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar."
    },
    {
      id: 3,
      text: "Which of these is an example of a physical change?",
      type: "mcq",
      options: [
        { id: "a", text: "Rusting of iron" },
        { id: "b", text: "Burning of wood" },
        { id: "c", text: "Melting of ice" },
        { id: "d", text: "Cooking an egg" }
      ],
      correctAnswer: "c",
      explanation: "Melting ice is a physical change because the water molecules stay the same; only the physical state changes from solid to liquid. The other options involve chemical changes where new substances are formed."
    },
    {
      id: 4,
      text: "The moon appears to change shape during the month because:",
      type: "mcq",
      options: [
        { id: "a", text: "It is actually changing shape" },
        { id: "b", text: "Different amounts of it are lit by the Sun as seen from Earth" },
        { id: "c", text: "Earth's shadow falls on it differently each night" },
        { id: "d", text: "It rotates at different speeds" }
      ],
      correctAnswer: "b",
      explanation: "The moon appears to change shape because as it orbits Earth, different portions of its sunlit half are visible from Earth. These different views are called moon phases."
    },
    {
      id: 5,
      text: "Which of the following is a good conductor of electricity?",
      type: "mcq",
      options: [
        { id: "a", text: "Rubber" },
        { id: "b", text: "Glass" },
        { id: "c", text: "Copper" },
        { id: "d", text: "Plastic" }
      ],
      correctAnswer: "c",
      explanation: "Copper is a metal and an excellent conductor of electricity. Rubber, glass, and plastic are insulators, which means they do not conduct electricity well."
    },
    {
      id: 6,
      text: "The process of water changing from a liquid to a gas is called:",
      type: "mcq",
      options: [
        { id: "a", text: "Condensation" },
        { id: "b", text: "Freezing" },
        { id: "c", text: "Evaporation" },
        { id: "d", text: "Precipitation" }
      ],
      correctAnswer: "c",
      explanation: "Evaporation is the process where liquid water turns into water vapor (gas). Condensation is the opposite process."
    },
    {
      id: 7,
      text: "All living things need oxygen to survive.",
      type: "truefalse",
      correctAnswer: "false",
      explanation: "Not all living things need oxygen. Some bacteria can survive without oxygen and are called anaerobic bacteria."
    },
    {
      id: 8,
      text: "When a person exercises, their heart rate increases to pump more blood to their muscles.",
      type: "truefalse",
      correctAnswer: "true",
      explanation: "During exercise, muscles need more oxygen and nutrients, so the heart beats faster to deliver more blood to the muscles."
    }
  ],
  "naplan-dt-y5-sample": [
    {
      id: 1,
      text: "What does CPU stand for?",
      type: "mcq",
      options: [
        { id: "a", text: "Central Processing Unit" },
        { id: "b", text: "Computer Processing Unit" },
        { id: "c", text: "Control Processing Unit" },
        { id: "d", text: "Central Processor Unit" }
      ],
      correctAnswer: "a",
      explanation: "CPU stands for Central Processing Unit, which is the main component of a computer that performs most of the processing inside the computer."
    },
    {
      id: 2,
      text: "Which of these is an input device?",
      type: "mcq",
      options: [
        { id: "a", text: "Monitor" },
        { id: "b", text: "Printer" },
        { id: "c", text: "Keyboard" },
        { id: "d", text: "Speaker" }
      ],
      correctAnswer: "c",
      explanation: "A keyboard is an input device because it allows users to input data into the computer. Monitors, printers, and speakers are output devices."
    },
    {
      id: 3,
      text: "What does PDF stand for?",
      type: "mcq",
      options: [
        { id: "a", text: "Portable Document Format" },
        { id: "b", text: "Printed Document File" },
        { id: "c", text: "Personal Data File" },
        { id: "d", text: "Programmed Document Format" }
      ],
      correctAnswer: "a",
      explanation: "PDF stands for Portable Document Format. It is a file format developed by Adobe that preserves document formatting and enables file sharing."
    },
    {
      id: 4,
      text: "In a spreadsheet, what is the correct name for the point where a row and column meet?",
      type: "mcq",
      options: [
        { id: "a", text: "Box" },
        { id: "b", text: "Cell" },
        { id: "c", text: "Point" },
        { id: "d", text: "Intersection" }
      ],
      correctAnswer: "b",
      explanation: "In a spreadsheet, the intersection of a row and a column is called a cell. Cells are where you enter data in a spreadsheet."
    },
    {
      id: 5,
      text: "Which of the following is true about an algorithm?",
      type: "mcq",
      options: [
        { id: "a", text: "It is a type of computer virus" },
        { id: "b", text: "It is a step-by-step procedure for solving a problem" },
        { id: "c", text: "It is a hardware component" },
        { id: "d", text: "It is a type of programming language" }
      ],
      correctAnswer: "b",
      explanation: "An algorithm is a step-by-step procedure for solving a problem or accomplishing a task. In computing, algorithms are used for data processing, calculation, and automated reasoning."
    },
    {
      id: 6,
      text: "What is the primary function of a web browser?",
      type: "mcq",
      options: [
        { id: "a", text: "To create web pages" },
        { id: "b", text: "To store website data" },
        { id: "c", text: "To display web pages" },
        { id: "d", text: "To connect to the internet" }
      ],
      correctAnswer: "c",
      explanation: "The primary function of a web browser is to display web pages. Web browsers translate web code into visible pages that people can interact with."
    },
    {
      id: 7,
      text: "In programming, what is a 'bug'?",
      type: "mcq",
      options: [
        { id: "a", text: "A special feature added by the programmer" },
        { id: "b", text: "A type of computer virus" },
        { id: "c", text: "An error in the code that causes it to behave unexpectedly" },
        { id: "d", text: "A piece of hardware that helps the computer run faster" }
      ],
      correctAnswer: "c",
      explanation: "In programming, a 'bug' is an error, flaw, or fault in the program that causes it to produce an incorrect or unexpected result, or to behave in unintended ways."
    },
    {
      id: 8,
      text: "The Internet and the World Wide Web are the same thing.",
      type: "truefalse",
      correctAnswer: "false",
      explanation: "The Internet is a global network of computers connected to each other. The World Wide Web is one of the services that runs on the Internet, which provides access to websites."
    },
    {
      id: 9,
      text: "Binary code consists of only two digits: 0 and 1.",
      type: "truefalse",
      correctAnswer: "true",
      explanation: "Binary code is a system of representing information using only two digits: 0 and 1. It is the fundamental language that computers understand."
    },
    {
      id: 10,
      text: "A computer needs both hardware and software to function properly.",
      type: "truefalse",
      correctAnswer: "true",
      explanation: "Hardware refers to the physical components of a computer, while software refers to the programs that run on it. A computer needs both to function properly."
    }
  ]
};
