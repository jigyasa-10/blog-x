import { Plus_Jakarta_Sans } from 'next/font/google'
import { siteConfig } from '@/config/site-config';
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from '@/providers';
import { NavBar } from '@/components/navbar';


const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <html suppressHydrationWarning={true} lang="en">
      <body
        suppressHydrationWarning={true}
        className={jakarta.className}>
        <div className='max-w-[2200px] mx-auto'>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </div>
      </body>
    </html >
  );
}
