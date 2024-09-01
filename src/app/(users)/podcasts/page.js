import CoverSection from '@/src/components/BodcastHome/CoverSection';
import RecentPodcast from '@/src/components/BodcastHome/RecentPodcasts';
import Link from 'next/link';
import api from '@/src/utils/api';

export async function generateMetadata({ searchParams }) {
    let podcastData = [];
    let selectedPodcastTitle = '';

    try {
        const response = await api.get('/Podcast', {
            cache: 'no-cache'  // Ensure the request bypasses the cache
        });
        podcastData = response.data.podcasts;

        const podcastTitle = searchParams.podcast || '';
        const selectedPodcast = podcastData.find(p => p.title.toLowerCase() === podcastTitle.toLowerCase()) || podcastData[podcastData.length - 1] || null;
        selectedPodcastTitle = selectedPodcast ? selectedPodcast.title : 'بودكاست';
    } catch (error) {
        console.error('Error fetching podcast data for metadata:', error);
    }

    return {
        metadataBase: new URL('https://2l2ana.com'),
        title: `استمع إلى ${selectedPodcastTitle} | قلقانة`,
        description: `استمع إلى أحدث البودكاست واستمتع بالمحتوى الرائع والمفيد.`,
        keywords: "بودكاست, استمع للبودكاست, استشارات طبية, نصائح صحية, استشارات اونلاين",
        author: "قلقانة",
        openGraph: {
            title: `استمع إلى ${selectedPodcastTitle} | قلقانة`,
            description: `استمع إلى أحدث البودكاست واستمتع بالمحتوى الرائع والمفيد.`,
            type: 'website',
            url: `https://2l2ana.com/podcasts`,
            images: [
                {
                    url: 'https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpodcast-image.abc123.png&w=1080&q=75',
                    width: 800,
                    height: 600,
                    alt: 'بودكاست',
                },
            ],
        },
    };
}

const VideosPage = async ({ searchParams }) => {
    let podcastData = [];
    let selectedPodcast = null;

    try {
        const response = await api.get('/Podcast', {
            cache: 'no-cache'  // Ensure the request bypasses the cache
        });
        podcastData = response.data.podcasts;

        const podcastTitle = searchParams.podcast || '';
        selectedPodcast = podcastData.find(p => p.title.toLowerCase() === podcastTitle.toLowerCase()) || podcastData[podcastData.length - 1] || null;
    } catch (error) {
        console.error('Error fetching podcast:', error);
    }

    return (
        <div className='mt-5'>
            <div className="flex flex-col items-center justify-center lg:w-[83%] m-auto">
                <CoverSection podcastData={podcastData} selectedPodcast={selectedPodcast} />
                <div className='flex items-center justify-start w-[90%] lg:w-[83%] lg:-mb-5 mb-10 mt-5 text-sm md:text-base'>
                    <Link href="/booking-Doctor" className='tajawal-medium hover:underline transition-all duration-300 text-accent'>
                        محتارة في استشارة ؟ احجزي مكالمة صوتية او فيديو الان مع افضل الدكاترة في مصر من بيتك
                    </Link>
                </div>
                <RecentPodcast Home={false} />
            </div>
        </div>
    );
};

export default VideosPage;
