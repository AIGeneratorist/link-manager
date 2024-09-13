import "./globals.css";

export const metadata = {
	title: "Link Manager",
	description: "A simple link manager"
};

export default function RootLayout({children}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
