import Answer from "./Answer";

interface QuestionProps {
	answers: string[];
	onPicked: (answer: string) => void;
}

export default function Question({answers, onPicked} : QuestionProps){
	return (
		<div>
		{answers.map(answer => {
			return <Answer answer={answer} onPicked={onPicked}/>
		})}
		</div>
	)
}