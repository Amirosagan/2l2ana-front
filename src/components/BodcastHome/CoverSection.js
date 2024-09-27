import { getTranslations } from 'next-intl/server';
import { Link } from '@/src/i18n/routing';

const CoverSection = async ({ podcastData, selectedPodcast }) => {
  const t = await getTranslations('CoverSection'); // Using getTranslations for async translations

  if (!selectedPodcast) {
    return <div>{t('errorLoadingPodcast')}</div>; // Localized error message
  }

  const spotifyUrl = selectedPodcast.audioUrl;

  return (
    <div className="w-full md:mt-5 lg:mt-0 md:inline-block">
      <h1 className='text-3xl mx-4 mb-5 md:hidden text-primary/90'>{t('podcast')}</h1> {/* Localized title */}
      <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative rounded-3xl bg-neutral-300">
        <div className="relative w-full h-full rounded-3xl z-20 overflow-hidden">
          {spotifyUrl ? (
            <iframe
              src={`https://open.spotify.com/embed/episode/${spotifyUrl.split('/').pop()}`}
              width="100%"
              height="352px"
              frameBorder="0"
              allow="encrypted-media"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-xl">{t('errorLoadingPodcast')}</span> {/* Localized error message */}
            </div>
          )}
        </div>
      </article>
      <div className='flex items-center m-auto justify-start w-[90%] lg:w-[83%] lg:-mb-5 mb-10 mt-5 text-sm md:text-base'>
        <Link href="/booking-Doctor" className='tajawal-medium hover:underline transition-all duration-300 text-accent'>
          {t('consultationLink')} {/* Localized link text */}
        </Link>
      </div>
    </div>
  );
};

export default CoverSection;
