import { useState } from "react";

export function useSettings(){
	const [category, setCategory] = useState<string>("9");
	const [numOfQuestions, setNumOfQuestions] = useState<string>('10');
	const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">('easy');
	return { category, setCategory, numOfQuestions, setNumOfQuestions, difficulty, setDifficulty };
}