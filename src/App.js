import { useState } from "react";
import questionsData from "./questions";
import "./App.css";

export default function LegalQuizApp() {
  const [chapter, setChapter] = useState(Object.keys(questionsData)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = questionsData[chapter];
  const current = questions[currentIndex];

  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) =>
      prev + 1 < questions.length ? prev + 1 : 0
    );
  };

  return (
    <div className="flex min-h-screen">
      {/* sidebar */}
      <div className="w-64 p-4 border-r bg-gray-50">
        <h2 className="font-bold mb-2">Capitole</h2>
        <ul>
          {Object.keys(questionsData).map((ch) => (
            <li
              key={ch}
              className={`cursor-pointer p-2 rounded hover:bg-gray-200 ${
                ch === chapter ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                setChapter(ch);
                setCurrentIndex(0);
                setSelected(null);
                setShowAnswer(false);
              }}
            >
              {ch}
            </li>
          ))}
        </ul>
      </div>

      {/* quiz panel */}
      <div className="flex-1 p-6">
        <div className="border rounded-xl p-6 shadow-md bg-white max-w-3xl mx-auto">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{current.q}</h3>

            <div className="space-y-2">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  className={`w-full text-left p-3 rounded border transition ${
                    showAnswer && i === current.answer
                      ? "border-green-500 bg-green-100"
                      : showAnswer && i === selected
                      ? "border-red-500 bg-red-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleOptionClick(i)}
                >
                  {opt}
                </button>
              ))}
            </div>

            {showAnswer && (
              <button
                onClick={nextQuestion}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Întrebare următoare
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
