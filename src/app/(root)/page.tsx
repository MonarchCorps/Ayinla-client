import BookNow from "@/features/landing/book-now";
import Contact from "@/features/landing/contact";
import Features from "@/features/landing/features";
import Hero from "@/features/landing/hero";
import Services from "@/features/landing/services";
import TailoredProperties from "@/features/landing/tailored-properties";

export default function Home() {
	return (
		<div className="bg-[#F1F9FF] pb-10">
			<Hero />
			<Services />
			<TailoredProperties />
			<Features />
			<BookNow />
			<Contact />
		</div>
	);
}
