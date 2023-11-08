import { AiQuery } from "../components";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col  p-24 space-y-4 bg-sky-950	text-white">
			<h1 className="text-4xl font-bold text-center">
				Welcome to Mental Cloud.
			</h1>
			<p className="text-xl font-semibold">
				We welcome you to curate your very first mental healthcare plan backed
				by research to start your week with your head in the clouds.
			</p>
			<AiQuery />
		</main>
	);
}
