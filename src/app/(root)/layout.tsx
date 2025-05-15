import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import ToastifyContainer from "@/components/toast-container";

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode
}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 min-h-full">
				{children}
				{modal}
			</main>
			<Footer />
			<ToastifyContainer />
		</div>
	);
}
