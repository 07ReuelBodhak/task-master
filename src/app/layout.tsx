import "./globals.css";

export const metadata = {
  title: "My Task Board",
  description: "Organize your tasks with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />

      <body>{children}</body>
    </html>
  );
}
