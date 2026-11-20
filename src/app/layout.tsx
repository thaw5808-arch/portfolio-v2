import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Chakra_Petch } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra-petch",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Thaw Zin Htut — UI/UX Designer & Front-End Developer";
const DESCRIPTION =
  "Portfolio of Thaw Zin Htut (Tim), a UI/UX designer and front-end developer from Bangkok who designs in Figma and builds with React and Next.js.";

// GitHub Pages sets NEXT_PUBLIC_SITE_URL (with its /portfolio-v2 path);
// metadataBase's path is joined to relative URLs like /og.jpg.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Thaw Zin Htut",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Hi, I'm Tim — portfolio hero" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${archivo.variable} ${chakraPetch.variable}`}
    >
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
