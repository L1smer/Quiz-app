interface AnswerProps {
	answer: string;
	onPicked: (answer: string) => void;
	pickedAnswer: string;
}

export default function Answer({answer, onPicked, pickedAnswer} : AnswerProps) {
	const isPicked = pickedAnswer === answer;
	function handleClick(answer: string){
		onPicked(answer);
	}
	return (
		<button className={isPicked ? 'picked' : ''} onClick={() => handleClick(answer)}>{answer}</button>
	)
}