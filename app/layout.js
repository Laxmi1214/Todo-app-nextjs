import "./globals.css";

export const metadata = {
  title: "Todo App",
  description: "Next.js Todo CRUD App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}