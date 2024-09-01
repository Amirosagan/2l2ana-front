import { useRouter } from 'next/navigation';
import en from '@/src/app/locales/en/common.json';
import ar from '@/src/app/locales/ar/common.json';

const translations = { en, ar };

export function useTranslation() {
  const router = useRouter();
  const locale = router.locale || 'ar';
  const t = (key) => translations[locale][key] || key;

  return { t, locale };
}
