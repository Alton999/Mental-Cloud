import { AiQuery } from "../components";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-24 space-y-4 bg-sky-950	text-white justify-center">
			<section className="lg:max-w-[1080px] space-y-4 mx-auto">
				<AiQuery />
			</section>
		</main>
	);
}
