import React from 'react';
import { useParams } from 'react-router-dom';
import topicData from '../Topic/topicData';

const Topic = () => {
  const { category, topic } = useParams();

  const content =
    topicData[category] && topicData[category][topic]
      ? topicData[category][topic]
      : null;

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        <h1 className="text-2xl font-semibold">❌ Topic Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-24 py-14 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">{content.title}</h1>

      {/* Definition */}
      {content.definition && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📘 Definition</h2>
          <p className="text-base leading-relaxed">{content.definition}</p>
        </section>
      )}

      {/* Types */}
      {content.types && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🧩 Types</h2>
          <ul className="list-disc list-inside space-y-1">
            {content.types.map((type, idx) => (
              <li key={idx} className="text-base">{type}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Code Example */}
      {content.code && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">💡 Code Example</h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{content.code}</code>
          </pre>
        </section>
      )}

      {/* Dry Run */}
      {content.dryRun && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🔍 Dry Run</h2>
          <p className="text-base">{content.dryRun}</p>
        </section>
      )}

      {/* Diagram or Animation */}
      {content.diagram && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📊 Diagram / Animation</h2>
          <img src={content.diagram} alt="Diagram" className="rounded-md shadow-md" />
        </section>
      )}

      {/* Subtopics */}
      {content.subtopics && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">📚 Subtopics</h2>
          <ul className="list-disc list-inside space-y-1">
            {content.subtopics.map((sub, idx) => (
              <li key={idx} className="text-base">{sub}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Useful Methods */}
      {content.methods && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🛠️ Useful Methods</h2>
          <ul className="list-disc list-inside space-y-1">
            {content.methods.map((method, idx) => (
              <li key={idx} className="text-base">{method}</li>
            ))}
          </ul>
        </section>
      )}

      {/* LeetCode Problems */}
      {content.leetcode && content.leetcode.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🧠 LeetCode Problems</h2>
          {content.leetcode.map((problem, idx) => (
            <div key={idx} className="mb-4 border p-4 rounded-md bg-gray-50">
              <p className="font-medium text-blue-600">{problem.title}</p>
              <p className="text-sm mb-2">{problem.description}</p>
              <pre className="bg-white border rounded-md p-3 text-sm overflow-x-auto">
                <code>{problem.solution}</code>
              </pre>
            </div>
          ))}
        </section>
      )}

      {/* General Solutions */}
      {content.patterns && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">🔁 General Patterns</h2>
          <ul className="list-disc list-inside space-y-1">
            {content.patterns.map((pattern, idx) => (
              <li key={idx} className="text-base">{pattern}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Topic;
