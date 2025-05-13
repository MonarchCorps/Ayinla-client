'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function ScrollToTop() {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [pathname]);

	return null;
}

export const ScrollLink = ({
	toId,
	children,
	className
}: {
	toId: string,
	children: React.ReactNode,
	className?: string
}) => {
	const scrollToContact = useCallback(() => {
		const section = document.getElementById(toId);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	}, []);

	return (
		<button tabIndex={0} onClick={scrollToContact} className={clsx("cursor-pointer", className)}>
			{children}
		</button>
	)

}