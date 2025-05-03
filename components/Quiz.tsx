import { useState, useEffect, useMemo } from "react";
import Question from "./Question";
import { dummyQuestions } from "../questions/dummyQuestions";

export interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quiz() {
  // 1. All states
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setIndex] = useState<number>(0);
  const [pickedAnswer, setPickedAnswer] = useState<string>('');
  const [rightAnswers, setRightAnswers] = useState<number>(0);

  // 2. useEffect for loading dummy data
  useEffect(() => {
    setQuestions(dummyQuestions);
    setLoading(false);
  }, []);

  // 3. useMemo for shuffled answers (must be before any return)
  const shuffledAnswers = useMemo(() => {
    if (!questions.length || !questions[currentQuestionIndex]) return [];
    const current = questions[currentQuestionIndex];
    return shuffleArray([...current.incorrect_answers, current.correct_answer]);
  }, [questions, currentQuestionIndex]);

  // 4. Early returns after all hooks
  if (loading) return <h2>Loading questions...</h2>;
  if (questions.length === 0) return <h2>No questions loaded.</h2>;

  // 5. Now safe to define current question
  const currentQuestion = questions[currentQuestionIndex];

  // 6. Functions
  function shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  function pickAnswer(answer: string) {
    setPickedAnswer(answer);

    const current = questions[currentQuestionIndex];
    if (answer === current.correct_answer) {
      setRightAnswers(prev => prev + 1);
    }
  }

  function handleNextQuestion() {
    if (currentQuestionIndex + 1 < questions.length) {
      setPickedAnswer('');
      setIndex(prev => prev + 1);
    } else {
      console.log("Quiz finished!");
      // Later show final score
    }
  }

  // 7. Rendering
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
      <Question answers={shuffledAnswers} onPicked={pickAnswer} />
      <button onClick={handleNextQuestion}>Next Question</button>
      <p>Score: {rightAnswers} / {questions.length}</p>
    </div>
  );
}
