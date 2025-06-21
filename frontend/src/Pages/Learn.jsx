import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const topics = [
  {
    category: 'DSA',
    subtopics: [
      { title: 'Arrays', desc: 'Basic to advanced array manipulation & problems.', completed: false },
      { title: 'Stack', desc: 'LIFO structure used for expressions and backtracking.', completed: false },
      { title: 'Queue', desc: 'FIFO structure with types like circular, deque.', completed: false },
      { title: 'Linked List', desc: 'Singly, doubly and circular linked lists.', completed: false },
      { title: 'Trees', desc: 'Binary Trees, BST, traversals, recursion.', completed: false },
      { title: 'Graphs', desc: 'BFS, DFS, shortest path, graph representation.', completed: false },
      { title: 'Recursion & Backtracking', desc: 'Recursive problem solving, N-Queens, Rat in a Maze.', completed: false },
    ],
  },
  {
    category: 'Programming Languages',
    subtopics: [
      { title: 'Java', desc: 'OOPs concepts, basic syntax, collections.', completed: false },
      { title: 'Python', desc: 'Scripting, data types, functions, OOP.', completed: false },
      { title: 'JavaScript', desc: 'DOM, ES6, asynchronous code, closures.', completed: false },
      { title: 'C++', desc: 'Templates, STL, pointers, OOP fundamentals.', completed: false },
      { title: 'Go', desc: 'Goroutines, concurrency, static typing.', completed: false },
      { title: 'TypeScript', desc: 'Strong typing for scalable JS development.', completed: false },
    ],
  },
  {
    category: 'Databases',
    subtopics: [
      { title: 'SQL', desc: 'Joins, normalization, indexing, stored procedures.', completed: false },
      { title: 'MongoDB', desc: 'NoSQL queries, collections, schema design.', completed: false },
      { title: 'PostgreSQL', desc: 'Advanced SQL with JSON and indexing.', completed: false },
      { title: 'Firebase', desc: 'Realtime database and Firestore basics.', completed: false },
    ],
  },
  {
    category: 'Cloud Computing',
    subtopics: [
      { title: 'AWS Basics', desc: 'EC2, S3, IAM, Lambda introduction.', completed: false },
      { title: 'Azure', desc: 'Azure Functions, App Services, Cosmos DB.', completed: false },
      { title: 'GCP', desc: 'Compute Engine, Cloud Storage, Firestore.', completed: false },
      { title: 'Serverless', desc: 'What is serverless? Pros and use-cases.', completed: false },
      { title: 'Deployment', desc: 'CI/CD pipelines, hosting strategies.', completed: false },
    ],
  },
  {
    category: 'Web Development',
    subtopics: [
      { title: 'HTML & CSS', desc: 'Semantic HTML, Flexbox, Grid, animations.', completed: false },
      { title: 'JavaScript', desc: 'DOM, events, ES6+, fetch API.', completed: false },
      { title: 'React.js', desc: 'Hooks, state management, component lifecycle.', completed: false },
      { title: 'Node.js', desc: 'Express, middlewares, APIs, routing.', completed: false },
      { title: 'MongoDB', desc: 'Integrating NoSQL with Node.', completed: false },
      { title: 'Next.js', desc: 'Fullstack framework with SSR & file routing.', completed: false },
    ],
  },
  {
    category: 'Advanced Topics',
    subtopics: [
      { title: 'System Design', desc: 'Scalability, load balancing, database design.', completed: false },
      { title: 'Low-Level Design (LLD)', desc: 'Class diagrams, design patterns.', completed: false },
      { title: 'CI/CD & DevOps', desc: 'GitHub Actions, Jenkins, Docker, K8s.', completed: false },
      { title: 'Machine Learning Basics', desc: 'Supervised learning, classification.', completed: false },
      { title: 'AI Integration', desc: 'Chatbots, LLMs, API use-cases.', completed: false },
    ],
  },
];

const Learn = () => {
  const [data, setData] = useState(topics);
  const navigate = useNavigate();

  const toggleComplete = (catIndex, subIndex) => {
    const newData = [...data];
    newData[catIndex].subtopics[subIndex].completed =
      !newData[catIndex].subtopics[subIndex].completed;
    setData(newData);
  };

  return (
    <div className="min-h-screen py-10 px-6 md:px-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Start Learning</h2>

      {data.map((section, catIndex) => (
        <div key={section.category} className="mb-10">
          <h3 className="text-2xl font-extrabold text-blue-600 mb-4">{section.category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {section.subtopics.map((topic, subIndex) => (
  <Link
    key={topic.title}
    to={`/learn/${section.category.toLowerCase().replace(/\s+/g, '-')}/${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div
      className={`p-5 rounded-xl border shadow-sm cursor-pointer hover:shadow-md transition ${
        topic.completed ? 'bg-green-100 border-green-400' : 'bg-gray-50'
      }`}
    >
      <h4 className="text-lg font-semibold text-gray-800 mb-1">{topic.title}</h4>
      <p className="text-sm text-gray-600">{topic.desc}</p>
      <p className="text-xs mt-2 text-gray-500">
        {topic.completed ? '✅ Completed' : '📖 Click to view'}
      </p>
    </div>
  </Link>
))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Learn;
