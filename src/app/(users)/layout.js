import '../globals.css';
import { Inter, Manrope, Tajawal } from 'next/font/google';

import Header from '@/src/components/Header';
import { cx } from '@/src/utils';
import MixFooter from "@/src/components/Footer/mixfooter";


const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-in' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-mr' });
const tajawal = Tajawal({ subsets: ['latin'], weight: '700', display: 'swap', variable: '--font-ta' });

export const metadata = {
  title: 'قلقانة',
  description: 'الموقع العربي الاول المهتم بصحة النساء',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet"/>        
<link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Lalezar&display=swap" rel="stylesheet"/>

      </head>
      <body className={cx(tajawal.variable, 'font-ta bg-white ')}>
        <Header/>
        <main className="md:pt-28 pt-20 md:pb-20 pb-10">
          {children}

          
        </main>
        <MixFooter/>
      </body>
    </html>
  );
}