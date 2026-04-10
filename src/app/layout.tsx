import "../styles/index.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Create PRD-based webpage",
  description: "Glaze digital agency portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
