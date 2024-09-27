import api from "@/src/utils/api";
import VideoPageClient from "./client";

const extractVideoId = (url) => {
  try {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get("v");
  } catch (error) {
    console.error("Error extracting video ID:", error);
    return null;
  }
};

export async function generateStaticParams() {
  const res = await api.get("/Youtube");
  const data = res.data;

  return data.items.map((video) => ({
    slug: `${video.youtubeLink.title.replace(/\s+/g, "-")}-${video.youtubeLink.id}`,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split("-").pop();

  const res = await api.get(`/Youtube/${id}`);
  const videoDetails = res.data.youtubeLink;

  return {
    title: `${videoDetails.title} |  قلقانة `,
    description:
      videoDetails.description ||
      `شاهد الفيديو الطبي عن ${videoDetails.title} واحصل على معلومات مفيدة.`,
    keywords:
      "حجز دكتور, فيديوهات طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, فيديو طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical videos, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, medical videos, professional medical advice",
    author: "قلقانة",
    openGraph: {
      title: `${videoDetails.title} | فيديوهات طبية`,
      description:
        videoDetails.description ||
        `شاهد الفيديو الطبي عن ${videoDetails.title} واحصل على معلومات مفيدة.`,
      type: "video.movie",
      url: `https://2l2ana.com/videos/${slug}`,
      video: {
        url: `https://www.youtube.com/watch?v=${extractVideoId(videoDetails.url)}`,
        type: "text/html",
        width: 1000,
        height: 520,
      },
      images: [
        {
          url: "https://2l2ana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75",
          width: 800,
          height: 600,
          alt: "فيديو طبي",
        },
      ],
    },
  };
}

const VideoPage = async ({ params }) => {
  const { slug } = params;
  const id = slug.split("-").pop();

  const response = await api.get(`/Youtube/${id}`);
  const videoDetails = response.data.youtubeLink;

  return (
    <div dir="rtl">
      <VideoPageClient initialVideoDetails={videoDetails} />
    </div>
  );
};

export default VideoPage;
