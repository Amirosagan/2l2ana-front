import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '@/src/app/globals.css';

export const metadata = {
  title: 'Admin Dashboard',
  description: '2l2ana Admin Dashboard',
};

export default async function AdminLayout({ children, params }) {
  const { locale } = params;

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
