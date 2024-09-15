import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/src/app/globals.css';
import { Inter, Manrope, Tajawal } from 'next/font/google';
import Header from '@/src/components/Header';
import { cx } from '@/src/utils';
import MixFooter from "@/src/components/Footer/mixfooter";

const tajawal = Tajawal({ subsets: ['latin'], weight: '700', display: 'swap', variable: '--font-ta' });

export async function generateMetadata() {
  return {
    metadataBase: new URL('https://2l2ana.com'),
    title: 'قلقانة',
    description: 'الموقع العربي الاول المهتم بصحة النساء',
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  // Fetch translations
  const messages = await getMessages();

  // Set `dir` attribute based on the locale (Arabic = rtl, otherwise ltr)
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-TL9K50X6ZX"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TL9K50X6ZX');
          `,
        }} />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Tajawal & Aref Ruqaa Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Lalezar&display=swap" rel="stylesheet" />
      </head>
      <body className={cx(tajawal.variable, 'font-ta bg-white')}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="md:pt-28 pt-24 md:pb-20 pb-10">
            {children}
          </main>
          <MixFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
