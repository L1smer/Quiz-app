import { useState, useEffect } from "react";
import Question from "./Question";
import { useSettings } from "../settings/settings";
import "../src/Quiz.css";

export interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizProps {
  onEnd: () => void;
}

export default function Quiz({ onEnd }: QuizProps) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setIndex] = useState<number>(0);
  const [pickedAnswer, setPickedAnswer] = useState<string>("");
  const [rightAnswers, setRightAnswers] = useState<number>(0);

  const { category, numOfQuestions, difficulty } = useSettings();

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${numOfQuestions}&category=${category}&difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        setQuestions(data.results || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading questions...</h2>;
  }

  if (questions.length === 0) {
    return (
      <div>
        <h2>Oops! No questions loaded.</h2>
        <p>Maybe too many requests? Try again later.</p>
        <button onClick={onEnd}>New Quiz</button>
      </div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div>
        <h2>Quiz Finished!</h2>
        <p>Your Score: {rightAnswers} / {questions.length}</p>
        <button onClick={onEnd}>New Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  let shuffledAnswers: string[];
  if (!currentQuestion) return shuffledAnswers = [];
  shuffledAnswers = shuffleArray([
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer
  ]); // 💥 Correct dependency

  function shuffleArray(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  function pickAnswer(answer: string) {
    setPickedAnswer(answer);
  }

  function handleNextQuestion() {
    if (pickedAnswer === currentQuestion.correct_answer) {
      setRightAnswers(prev => prev + 1);
    }
    setPickedAnswer('');
    setIndex(prev => prev + 1);
  }

  return (
		<div className="quiz-container">
			<h1 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
			<div className="answers-container">
				<Question
					answers={shuffledAnswers}
					onPicked={pickAnswer}
					pickedAnswer={pickedAnswer}
				/>
			</div>
			<button onClick={handleNextQuestion}>Next Question</button>
			<p className="score">Score: {rightAnswers} / {questions.length}</p>
		</div>
	);
}
