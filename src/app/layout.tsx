import "../styles/index.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio of Glaze",
  description: "Welcome to our portfolio. visit it and see how it is befor any decision",
  openGraph: {
    title: "Portfolio of Glaze",
    description: "Welcome to our portfolio. visit it and see how it is befor any decision",
    images: ["/photos/main/portfolio.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio of Glaze",
    description: "Welcome to our portfolio. visit it and see how it is befor any decision",
    images: ["/photos/main/portfolio.png"],
  },
  metadataBase: new URL("https://glaze-portfolio-1.vercel.app/"),
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
