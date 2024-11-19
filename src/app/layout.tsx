import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "ringo-viewer",
    description: "new RCRS Log Viewer",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="jp">
            <body>{children}</body>
        </html>
    );
}
