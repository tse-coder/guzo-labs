import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AIAssistant from "@/components/AIAssistant";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resort Admin Dashboard",
  description: "Admin dashboard for managing resort members and subscriptions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          {children}
          <AIAssistant />
        </ThemeProvider>
      </body>
    </html>
  );
}
