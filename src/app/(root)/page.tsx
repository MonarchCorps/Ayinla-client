import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import TailoredProperties from "@/components/landing/tailored-properties";

export default function Home() {
	return (
		<main>
			<div className="bg-[#F1F9FF]">
				<Hero />
				<Services />
				<TailoredProperties />
				<Features />
			</div>
		</main>
	);
}
