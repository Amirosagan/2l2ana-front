import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaSnapchatGhost, FaTwitter } from 'react-icons/fa';
import { Link } from '@/src/i18n/routing';
import Image from "next/image";
import { useTranslations } from 'next-intl';
import profileImg from '@/public/logoo.svg';

const Footer = () => {
    const t = useTranslations('Footer'); 
    const currentYear = new Date().getFullYear();

    return (
        <div className="px-5 pt-16 lg:pt-0">
            <div className="flex justify-between lg:gap-16 items-center flex-col md:flex-row w-full md:w-[90%] lg:w-[75%] m-auto">
                <div className="flex flex-col md:flex-row gap-12 lg:gap-24 justify-around">
                    <div>
                        <h1 className="tajawal-bold text-xl md:text-lg">{t('bookDoctor')}</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col md:text-base text-sm">
                                <Link href="/booking-Doctor" className="hover:text-accent transition-all duration-200">{t('specialist1')}</Link>
                                <Link href="/booking-Doctor" className="hover:text-accent transition-all duration-200">{t('specialist2')}</Link>
                                <Link href="/booking-Doctor" className="hover:text-accent transition-all duration-200">{t('specialist3')}</Link>
                                <Link href="/booking-Doctor" className="hover:text-accent transition-all duration-200">{t('moreSpecialists')}</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold text-xl md:text-lg ">{t('followUs')}</h1>
                        <div>
                            <div className="grid grid-cols-3 gap-2 pt-4 transition-all duration-200">
                                <Link href="https://www.facebook.com/profile.php?id=61564115679821&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="bg-accent w-8 h-8 md:h-8 md:w-8  p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.instagram.com/mettamena?igsh=MWM3OWtpbWQybGZkaQ==" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="bg-accent w-8 h-8 md:h-8 md:w-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.youtube.com/@mettamena" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube className="bg-accent w-8 h-8 md:h-8 md:w-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.tiktok.com/@mettamena?_t=8ovfwccfiro&_r=1" target="_blank" rel="noopener noreferrer">
                                    <FaTiktok className="bg-accent w-8 h-8 md:h-8 md:w-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.snapchat.com/add/amettamena" target="_blank" rel="noopener noreferrer">
                                    <FaSnapchatGhost className="bg-accent w-8 h-8 md:h-8 md:w-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://x.com/mettamena?s=21&t=XJ-_AGsiIAzwqCjFwiR8OQ" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="bg-accent w-8 h-8 md:h-8 md:w-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold text-xl md:text-lg">{t('ourServices')}</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col text-sm md:text-base">
                                <Link href="/blogs" className="hover:text-accent transition-all duration-200">{t('medicalArticles')}</Link>
                                <Link href="/videos" className="hover:text-accent transition-all duration-200">{t('medicalVideos')}</Link>
                                <Link href="/podcasts" className="hover:text-accent transition-all duration-200">{t('podcast')}</Link>
                                <Link href="/medical-questions" className="hover:text-accent transition-all duration-200">{t('medicalQuestions')}</Link>
                                <Link href="/ask-Doctor" className="hover:text-accent transition-all duration-200">{t('askUs')}</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold md:text-xl text-lg">{t('aboutUs')}</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col text-sm md:text-base">
                                <Link href="/aboutUs" className="hover:text-accent transition-all duration-200">{t('whoWeAre')}</Link>
                                <Link href="/termsofuse" className="hover:text-accent transition-all duration-200">{t('termsOfUse')}</Link>
                                <div className="hover:text-accent transition-all duration-200">{t('contactUs')}</div>

                                <div>
                                    <a 
                                        href="mailto:customer.care@mettamena.com" 
                                        className="text-accent transition-all duration-200 block"
                                    >
                                         {t('email')}
                                    </a>
                                    <a 
                                        href="https://wa.me/201210684419" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-accent mt-2 transition-all duration-200 block"
                                    >
                                         {t('whatsapp')}
                                    </a>
                                </div>
                                <Image className=" md:w-[130px] hidden lg:hidden md:block mt-2" alt="Doctor" src={profileImg} />
                            </div>
                        </div>
                    </div>
                </div>
                <Image className="lg:w-[300px] md:hidden mt-10 lg:mt-0 lg:block w-[200px] pb-5" alt="Doctor" src={profileImg} />
            </div>
            <div className="w-full mt-8 relative font-medium pb-8 px-8 flex flex-col md:flex-row items-center justify-center">
            <span className="text-center text-sm md:text-base">
                    &copy;{currentYear} 2l2ana. All rights reserved.
                </span>
            </div>
        </div>
    );
}

export default Footer;
