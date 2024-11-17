import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navbar';
import { PointsProvider } from './PointContext'; // Import the PointsProvider

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RecycSmart - Gamifying Recycling',
  description: 'Make recycling fun and rewarding with RecycSmart',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <PointsProvider> {/* Wrap ThemeProvider with PointsProvider */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </PointsProvider>
      </body>
    </html>
  );
}