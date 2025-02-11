import { Inter } from "next/font/google";
import { dark, neobrutalism } from "@clerk/themes";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { Toaster } from "sonner";

// const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "SkillSync - Ai Path Pilot",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: neobrutalism, variables:{colorWarning:'transparent' , colorInputText:'grey'}}}>
      <html lang="en" suppressHydrationWarning>
        <body 
        // className={`${inter.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* header */}
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster richColors/>
            {/* footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>Made by d3vpratap</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
