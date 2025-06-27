import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const chapters = {
  "Capitolul I": [
    {
      q: "Care e cea mai potrivită descriere a raportului juridic obligațional?",
      options: [
        "O convenție între două părți privind plata unei sume de bani",
        "Legătura juridică prin care un subiect (creditor) poate cere unei alte persoane (debitor) executarea unei prestații",
        "Dreptul unui subiect de a folosi un bun al altuia",
        "Un acord de voință fără efecte juridice"
      ],
      answer: 1
    },
    {
      q: "Dacă în cadrul unei obligaţii „de a nu face” apare o stipulație de tip penalizare, care este efectul principal?",
      options: [
        "Convertirea obligației într-una de a da",
        "Menținerea obligației de abstinență și adăugarea unei sancțiuni pecuniare",
        "Eliminarea obligației de a nu face",
        "Transmiterea obligației către terți"
      ],
      answer: 1
    }
    // Add more questions here...
  ],
  "Capitolul II": [
    {
      q: "De ce se spune că vechile contracte „tradițional civile” erau mai rigide?",
      options: [
        "Pentru că aveau forme stricte prevăzute expres de cod",
        "Pentru că nu acceptau negociere",
        "Din cauza lipsei de sancțiuni",
        "Pentru că nu erau recunoscute de instanțe"
      ],
      answer: 0
    }
    // Continue with the rest of the chapters and questions
  ]
};

export default function LegalQuizApp() {
  const [chapter, setChapter] = useState("Capitolul I");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const questions = chapters[chapter];
  const current = questions[currentIndex];

  const handleOptionClick = (index) => {
    if (showAnswer) return;
    setSelected(index);
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1 < questions.length ? prev + 1 : 0));
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 p-4 border-r">
        <h2 className="font-bold mb-2">Capitole</h2>
        <ul>
          {Object.keys(chapters).map((ch) => (
            <li
              key={ch}
              className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${ch === chapter ? "bg-gray-200" : ""}`}
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
      <div className="flex-1 p-6">
        <Card className="max-w-xl mx-auto">
          <CardContent className="space-y-4">
            <h3 className="text-lg font-semibold">{current.q}</h3>
            <div className="space-y-2">
              {current.options.map((opt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className={`w-full justify-start text-left ${
                    showAnswer && i === current.answer
                      ? "border-green-500 bg-green-100"
                      : showAnswer && i === selected
                      ? "border-red-500 bg-red-100"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(i)}
                >
                  {opt}
                </Button>
              ))}
            </div>
            {showAnswer && (
              <Button onClick={nextQuestion}>Întrebare următoare</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
