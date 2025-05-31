import AskDoctor from "./client";

export const metadata = {
    metadataBase: new URL('https://mettamena.com'),
    title: "اطرح سؤالك الآن ليصل إلى آلاف الأطباء | متطمنة",
    description: "احصل على إجابة لسؤالك في غضون 48 ساعة، أو اشترك مع متطمنة لتحصل على استشارة فورية وسرية مع طبيب معتمد.",
    keywords: "حجز دكتور, اسئلة طبية, استشارة طبية, نصائح طبية, استفسارات صحية, دكتور اونلاين, دكتور عبر الإنترنت, حجز استشارة طبية, سؤال طبي, طبيب استشاري, نصيحة طبية, استفسار طبي, حجز موعد مع دكتور, استشارة دكتور, نصائح صحية, طبيب متخصص, استفسارات طبية شائعة, book doctor, medical questions, doctor consultation, medical advice, health queries, online doctor, doctor appointment, medical consultation, ask doctor, professional medical advice",
    author: "متطمنة",
    openGraph: {
        title: "اطرح سؤالك الآن ليصل إلى آلاف الأطباء | متطمنة",
        description: "احصل على إجابة لسؤالك في غضون 48 ساعة، أو اشترك مع متطمنة لتحصل على استشارة فورية وسرية مع طبيب معتمد.",
        type: 'website',
        url: `https://mettamena.com/ask-Doctor`,
        images: [
            {
                url: 'https://mettamena.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-imgr.9825690a.png&w=1080&q=75',
                height: 600,
                alt: 'اسئلة طبية',
            },
        ],
    },
};

export default function Page() {
    return <AskDoctor />;
}
