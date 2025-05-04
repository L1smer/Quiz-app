import Answer from "./Answer"

interface QuestionProps {
	answers: string[];
	onPicked: (answer: string) => void;
	pickedAnswer: string;
}

export default function Question({answers, onPicked, pickedAnswer} : QuestionProps){
	return (
		<div>
		{answers.map((answer,index) => {
			return <Answer key={index} answer={answer} onPicked={onPicked} pickedAnswer={pickedAnswer}/>
		})}
		</div>
	)
}