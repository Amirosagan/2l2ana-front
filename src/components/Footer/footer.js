import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaSnapchatGhost, FaTwitter } from 'react-icons/fa';
import Link from "next/link";
import profileImg from '@/public/profile-imgr.png';
import Image from "next/image";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="px-5 pt-16 lg:pt-0">
            <div className="flex justify-between gap-16 items-center flex-col md:flex-row w-full md:w-[90%] lg:w-[75%] m-auto">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 justify-around">
                    <div>
                        <h1 className="tajawal-bold text-xl">احجزي اشطر دكتور</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col">
                                <Link href="booking-Doctor" className="hover:text-accent">دكتور نسا وتوليد</Link>
                                <Link href="booking-Doctor" className="hover:text-accent">اخصائي علم نفس</Link>
                                <Link href="booking-Doctor" className="hover:text-accent">دكتور ادمان وامراض نفسية</Link>
                                <Link href="booking-Doctor" className="hover:text-accent">المزيد من التخصصات</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold text-xl">تابعينا</h1>
                        <div>
                            <div className="grid grid-cols-3 gap-2 pt-4">
                                <Link href="https://www.facebook.com/profile.php?id=61564115679821&mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                                    <FaFacebookF className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.instagram.com/2l2ana?igsh=MWM3OWtpbWQybGZkaQ==" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                                    <FaYoutube className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.tiktok.com/@2l2ana?_t=8ovfwccfiro&_r=1" target="_blank" rel="noopener noreferrer">
                                    <FaTiktok className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://www.snapchat.com/add/a2l2ana" target="_blank" rel="noopener noreferrer">
                                    <FaSnapchatGhost className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                                <Link href="https://x.com/2l2ana?s=21&t=XJ-_AGsiIAzwqCjFwiR8OQ" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="bg-accent w-8 h-8 p-1 hover:scale-125 transition-all ease duration-200 text-white" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold text-xl">خدماتنا</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col">
                                <Link href="/blogs" className="hover:text-accent">مقالات طبية</Link>
                                <Link href="/videos" className="hover:text-accent">فيديوهات طبية</Link>
                                <Link href="/podcasts" className="hover:text-accent">بودكاست قلقانة</Link>
                                <Link href="/medical-questions" className="hover:text-accent">اسئلة طبية</Link>
                                <Link href="/ask-Doctor" className="hover:text-accent">اسألنا؟</Link>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="tajawal-bold text-xl"> اعرفي عننا</h1>
                        <div>
                            <div className="flex tajawal-medium gap-2 pt-4 flex-col">
                                <Link href="/aboutUs" className="hover:text-accent"> من نحن </Link>
                                <Link href="/termsofuse" className="hover:text-accent"> سياسة الاستخدام </Link>
                            </div>
                        </div>
                    </div>
                
                </div>
                <Image className="w-[200px] pb-5" alt="Doctor" src={profileImg} />
            </div>
            <div className="w-full mt-8 relative font-medium pb-8 px-8 flex flex-col md:flex-row items-center justify-center">
                <span className="text-center">
                    &copy;{currentYear} 2l2ana. All rights reserved.
                </span>
            </div>
        </div>
    );
}

export default Footer;
