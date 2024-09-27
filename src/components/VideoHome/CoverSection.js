import YouTubePlayer from './YouTubePlayer';
import { useTranslations } from 'next-intl'; // Import useTranslations for localization

const CoverSection = ({ video }) => {
  const t = useTranslations('CoverSection'); // Use the 'CoverSection' namespace for translations

  if (!video) {
    return <div>{t('errorLoadingVideo')}</div>; // Localized error message
  }

  return (
    <div className="w-full md:inline-block" dir='rtl'>
      <h1 className='text-3xl mx-4 mb-5 md:hidden text-primary/90'>{t('videos')}</h1> {/* Localized title */}
      <article className="flex flex-col items-start justify-end mx-5 lg:w-[90%] lg:m-auto relative h-[40vh] md:h-[80vh]">
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-10" />
        <div className="relative w-full h-full rounded-3xl z-20 overflow-hidden">
          <YouTubePlayer videoUrl={video.youtubeLink.url} />
        </div>
      </article>
    </div>
  );
};

export default CoverSection;
