import { useSettings }  from '../settings/settings'
import '../src/QuizGenerator.css'
import { motion } from "framer-motion";

interface QuizGeneratorProps {
	onStart: () => void
}

export default function QuizGenerator({onStart}: QuizGeneratorProps) {
  const {category, setCategory, numOfQuestions, setNumOfQuestions, difficulty, setDifficulty} =
	useSettings()

  return (
    <motion.div
      className="generator-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Quiz (by Trivia database)</h1>
			<p>Choose category:</p>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="9">General Knowledge</option>
        <option value="10">Entertainment: Books</option>
        <option value="11">Entertainment: Film</option>
        <option value="12">Entertainment: Music</option>
        <option value="13">Entertainment: Musicals & Theatres</option>
        <option value="14">Entertainment: Television</option>
        <option value="15">Entertainment: Video Games</option>
        <option value="16">Entertainment: Board Games</option>
        <option value="17">Science & Nature</option>
        <option value="18">Science: Computers</option>
        <option value="19">Science: Mathematics</option>
        <option value="20">Mythology</option>
        <option value="21">Sports</option>
        <option value="22">Geography</option>
        <option value="23">History</option>
        <option value="24">Politics</option>
        <option value="25">Art</option>
        <option value="26">Celebrities</option>
        <option value="27">Animals</option>
        <option value="28">Vehicles</option>
        <option value="29">Entertainment: Comics</option>
        <option value="30">Science: Gadgets</option>
        <option value="31">Entertainment: Japanese Anime & Manga</option>
        <option value="32">Entertainment: Cartoon & Animations</option>
      </select>
			<p>Number of Questions:</p>
			<input type="number" value={numOfQuestions} onChange={e => setNumOfQuestions(e.target.value)}/>
			<p>Choose difficulty:</p>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as "easy" | "medium" | "hard")}>
				<option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
			</select>
      <button onClick={onStart}>Start Quiz</button>
		</motion.div>
  );
}
