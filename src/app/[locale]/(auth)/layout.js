import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/src/app/globals.css';
import { Tajawal } from 'next/font/google';
import { cx } from '@/src/utils';
import Header from '@/src/components/Header';

const tajawal = Tajawal({ subsets: ['latin'], weight: '700', display: 'swap', variable: '--font-ta' });

export const metadata = {
  title: 'تسجيل الدخول | قلقانة',
  description: 'اهلا بيكي في اكبر مجتمع يخص صحة النساء في الوطن العربي',
};

export default async function LoginLayout({ children, params }) {
  const { locale } = params;

  const messages = await getMessages(locale);

  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Lalezar&display=swap" rel="stylesheet" />
      </head>
      <body className={cx(tajawal.variable, 'font-ta bg-white h-screen overflow-hidden')}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="h-full">
            <div className="flex h-full">
              <div className="w-[60%] md:flex hidden items-center tajawal-bold bg-primary justify-center text-white text-5xl">
                <CommunityHeading /> 
              </div>
              <div className="md:w-[50%] w-full px-2 md:px-10 flex items-center h-full">
                <div className="justify-center items-center sm:w-[90%] w-full m-auto">{children}</div>
              </div>
            </div>
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

const CommunityHeading = () => {
  const t = useTranslations('LoginLayout'); 
  return (
    <h1 className="w-[86%] flex items-start leading-[4rem] p-10">
      {t('communityText')}
    </h1>
  );
};
