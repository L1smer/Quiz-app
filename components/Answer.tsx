import { useState } from "react";

interface AnswerProps {
	answer: string;
	onPicked: (answer: string) => void;
}

export default function Answer({answer, onPicked} : AnswerProps) {
	const [picked,setPick] = useState<boolean>(false);
	function handleClick(answer: string){
		setPick(!picked);
		onPicked(answer);
	}
	return (
		<button className={picked ? 'picked' : ''} onClick={() => handleClick(answer)}>{answer}</button>
	)
}