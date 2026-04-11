import "../styles/index.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Glaze_digital_Agency",
  description: "Welcome to our website. Visit it and see how it is befor any decision",
  openGraph: {
     title: "Glaze_digital_Agency",
  description: "Welcome to our website. Visit it and see how it is befor any decision",
    images: ["/photos/main/portfolio.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glaze_digital_Agency",
  description: "Welcome to our website. Visit it and see how it is befor any decision",
    images: ["/photos/main/portfolio.png"],
  },
  metadataBase: new URL("https://glazedizitalagency.vercel.app//"),
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
