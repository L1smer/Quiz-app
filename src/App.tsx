import Quiz from "../components/Quiz";
import QuizGenerator from "../components/QuizGenerator"
import { useState } from "react";

export default function App(){
	const [isQuizGoing, setIsQuizGoing] = useState(false);
	return (
    <div>
      {isQuizGoing ? (
        <Quiz onEnd={() => setIsQuizGoing(false)} />
      ) : (
        <QuizGenerator onStart={() => {
          setIsQuizGoing(true);
        }} />
      )}
    </div>
  )
}
