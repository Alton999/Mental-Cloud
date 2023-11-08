"use client";
import { useEffect, useState } from "react";
import { ToggleCondition, ResultsOutput } from ".";

const AiQuery = () => {
	const [query, setQuery] = useState("");
	const [result, setResult] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selectedCondition, setSelectedCondition] = useState("");
	const [goals, setGoals] = useState("");
	// const testingOutput = `
	// {
	// 	"healthStatement": "Based on your symptoms of anxiety and how it has been affecting your academic performance and overall well-being, it would be beneficial for you to seek support from a mental health professional, such as a psychologist or therapist. They can provide you with strategies and techniques to manage your anxiety and improve your productivity. Additionally, consider utilizing resources and techniques listed below as part of your healthcare plan.",

	// 	"week1": {
	// 		"weekTitle": "Understanding Anxiety and Its Effects",
	// 		"strategies": "Start by gaining a better understanding of anxiety and its impact on your daily life. Educate yourself about the symptoms, triggers, and coping mechanisms associated with anxiety. Keep a journal to track your anxiety patterns and identify any recurring triggers. Begin practicing deep breathing exercises or mindfulness techniques to help reduce anxiety in the moment.",
	// 		"techniques": [
	// 			"Deep breathing exercises",
	// 			"Mindfulness meditation",
	// 			"Journaling"
	// 		]
	// 	},

	// 	"week2": {
	// 		"weekTitle": "Creating a Calming Environment",
	// 		"strategies": "Focus on creating a calming environment in your study space. Remove distractions, such as clutter or noise, and organize your materials for better productivity. Experiment with ambient music or nature sounds to create a soothing atmosphere. Establish a study routine that includes breaks for relaxation and self-care activities, like going for walks or practicing hobbies.",
	// 		"techniques": [
	// 			"Decluttering your study space",
	// 			"Using ambient music or nature sounds",
	// 			"Incorporating regular breaks for relaxation"
	// 		]
	// 	},

	// 	"week3": {
	// 		"weekTitle": "Cognitive Restructuring",
	// 		"strategies": "Practice cognitive restructuring techniques to challenge and change negative thought patterns that contribute to anxiety. Identify any irrational beliefs or self-doubt associated with your academic performance. Replace negative thoughts with more positive and realistic ones. Write down affirmations or positive statements to remind yourself of your capabilities.",
	// 		"techniques": [
	// 			"Identifying negative thought patterns",
	// 			"Challenging irrational beliefs",
	// 			"Creating positive affirmations"
	// 		]
	// 	},

	// 	"week4": {
	// 		"weekTitle": "Addressing Perfectionism and Time Management",
	// 		"strategies": "Reflect on any perfectionistic tendencies that may contribute to your anxiety. Set realistic goals and allow yourself to make mistakes without self-judgment. Develop effective time management skills to better prioritize tasks and reduce feelings of being overwhelmed. Break larger tasks into smaller, manageable steps to enhance productivity.",
	// 		"techniques": [
	// 			"Setting realistic goals",
	// 			"Practicing self-compassion",
	// 			"Utilizing time management techniques"
	// 		]
	// 	},

	// 	"week5": {
	// 		"weekTitle": "Seeking Support and Maintaining Self-Care",
	// 		"strategies": "Reach out to a mental health professional to further explore and address your anxiety. Consider therapy sessions to learn additional coping strategies and receive guidance tailored to your specific needs. Prioritize self-care activities, such as exercise, healthy eating, and maintaining social connections. Regularly assess your progress and make adjustments to your healthcare plan as needed.",
	// 		"techniques": [
	// 			"Engaging in therapy or counseling",
	// 			"Prioritizing self-care activities",
	// 			"Maintaining social connections"
	// 		]
	// 	}
	// }
	// `;
	async function createIndexAndEmbeddings() {
		try {
			const result = await fetch("/api/setup", {
				method: "POST"
			});
			const data = await result.json();
			console.log("results", data);
		} catch (err) {
			console.log("Err:", err);
		}
	}

	async function sendQuery() {
		if (!query || !selectedCondition) return;
		setResult(null);
		setLoading(true);
		try {
			const result = await fetch("/api/read", {
				method: "POST",
				body: JSON.stringify({ query, selectedCondition, goals })
			});
			const json = await result.json();
			// console.log(JSON.stringify(json));
			// const jsonParse = JSON.parse(json);
			setResult(
				JSON.parse(
					JSON.parse(JSON.stringify(json)).data.replace(/(\r\n|\n|\r)/gm, "")
				)
			);

			console.log(result);
			// setResult();
			setLoading(false);
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	return (
		<section>
			<div>
				<div className="py-6 w-full space-y-8">
					<div className="space-y-3">
						<h2 className="text-lg font-semibold">
							Which one of these conditions best describes your situation?
						</h2>
						<div className="flex gap-12 flex-wrap">
							<ToggleCondition
								condition="Anxiety"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Anxiety")}
							/>
							<ToggleCondition
								condition="Depression"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Depression")}
							/>
							<ToggleCondition
								condition="Attention-hyperactivity disorder (ADHD)"
								selectedCondition={selectedCondition}
								handleToggle={() =>
									setSelectedCondition(
										"Attention-hyperactivity disorder (ADHD)"
									)
								}
							/>
							<ToggleCondition
								condition="Eating disorder"
								selectedCondition={selectedCondition}
								handleToggle={() => setSelectedCondition("Eating disorder")}
							/>
						</div>
					</div>
					<div className="space-y-3">
						<label htmlFor="query" className="font-semibold text-lg">
							How has this condition affected you? Give a short sentence
							describing your situation.
						</label>
						<input
							name="query"
							type="text"
							className="text-black px-2 py-1 w-full"
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
					<div className="space-y-3">
						<label htmlFor="goals" className="font-semibold text-lg">
							What do you want to get out of this health plan? Give a short
							sentence describing your situation.
						</label>
						<input
							name="goals"
							type="text"
							className="text-black px-2 py-1 w-full"
							onChange={(e) => setGoals(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<button
				className="px-7 py-1 bg-white text-black mt-2 mb-2"
				onClick={sendQuery}
			>
				{loading ? <p>Asking AI...</p> : <p>Generate</p>}
			</button>
			{/* <div>{result && result.healthStatement}</div> */}
			{/* {result && <div>Result: {}</div>} */}
			<div>
				{result && <ResultsOutput results={result} />}
				{/* <ResultsOutput results={JSON.parse(testingOutput)} /> */}
			</div>
			<button
				className="px-7 py-1 bg-white text-black mt-2 mb-2"
				onClick={createIndexAndEmbeddings}
			>
				Create index and embeddings
			</button>
		</section>
	);
};

export default AiQuery;
