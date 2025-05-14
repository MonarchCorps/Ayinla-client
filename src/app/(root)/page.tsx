import BookNow from "@/components/landing/book-now";
import Contact from "@/components/landing/contact";
import Features from "@/components/landing/features";
import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import TailoredProperties from "@/components/landing/tailored-properties";

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
