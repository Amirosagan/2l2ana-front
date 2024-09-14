'use client';

import { useState, useEffect } from 'react';
import { checkSession, logout } from '@/src/utils/auth';
import { useRouter } from "@/src/i18n/routing";
import Avatar from './Avatar';
import MenuItem from './MenuItem';
import Image from 'next/image';
import { Link } from '@/src/i18n/routing';
import profileImg from '@/public/profile-imgr.png';
import { MenuIcon, XIcon, ChevronDownIcon, ChevronUpIcon, FileTextIcon, VideoIcon, HelpCircleIcon, SendIcon, InfoIcon } from 'lucide-react';
import { useTranslations } from 'next-intl'; 

const LoginAccount = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [submenuOpen, setSubmenuOpen] = useState('');
  const router = useRouter();
  const t = useTranslations('LoginAccount'); 

  useEffect(() => {
    const verifySession = async () => {
      const sessionData = await checkSession();
      setIsLoggedIn(!!sessionData);
      if (sessionData) {
        setUser(sessionData.session);
      }
    };

    if (typeof window !== 'undefined') {
      verifySession();
    }
  }, []);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      const handleOutsideClick = (event) => {
        if (!event.target.closest('.menu-container')) {
          setIsOpen(false);
        }
      };
      window.addEventListener('click', handleOutsideClick);

      return () => {
        window.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [isOpen]);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      logout();
      setIsLoggedIn(false);
      setUser(null);
      router.push('/login');
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  const toggleSubmenu = (menu) => {
    setSubmenuOpen(submenuOpen === menu ? '' : menu);
  };

  return (
    <div className="relative ml-6 menu-container">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-3 md:py-2 md:px-3 bg-white flex flex-row items-center gap-2 rounded-full cursor-pointer shadow-md transition"
        >
          <MenuIcon className="" />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'bg-gray-800 bg-opacity-75' : 'opacity-0 pointer-events-none'}`} onClick={toggleOpen}>
        <div
          className={`absolute right-0 top-0 h-full w-64 text-gray-500 bg-white shadow-md overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} cursor-pointer`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-4 h-full">
            <div className="absolute top-4 left-4">
              <div onClick={toggleOpen} className="p-2 mt-2 bg-primary text-white rounded-full cursor-pointer shadow-md transition">
                <XIcon className="h-5 w-5" />
              </div>
            </div>
            <Link href="/"> 
            <MenuItem label={t('home')} />
                </Link>

            {isLoggedIn && <Link href="/my-profile"> <MenuItem  label={t('myProfile')}  /> </Link>}
            {isLoggedIn && <Link href="/my-bookings"> <MenuItem  label={t('myBookings')} /> </Link>}
            <div onClick={() => toggleSubmenu('content')} className="cursor-pointer flex justify-between items-center">
              <MenuItem label={t('medicalContent')} />
              {submenuOpen === 'content' ? <ChevronUpIcon className="text-primary" /> : <ChevronDownIcon className="text-primary" />}
            </div>
            {submenuOpen === 'content' && (
              <div className="ml-4 transition-all text-gray-800 duration-300 ease-in-out">
                <Link href="/blogs"> 
                <MenuItem  label={t('blogs')} icon={<FileTextIcon className="text-primary" />} />
                </Link>
                <Link href="/videos"> 
                <MenuItem label={t('videos')} icon={<VideoIcon className="text-primary" />} />

                </Link>
                <Link href="/podcasts"> 
                <MenuItem  label={t('podcasts')} icon={<VideoIcon className="text-primary" />} />

                </Link>
                <Link href="/medical-questions"> 
                <MenuItem  label={t('medicalQuestions')} icon={<HelpCircleIcon className="text-primary" />} />

                </Link>
                <Link href="/ask-Doctor"> 
                <MenuItem label={t('askDoctor')} icon={<SendIcon className="text-primary" />} />

                </Link>
              </div>
            )}

<Link href="/booking-Doctor"> 
<MenuItem onClick={() => handleNavigation('/booking-Doctor')} label={t('bookDoctor')} />
                </Link>
            
                <Link href="/aboutUs"> 
                <MenuItem label={t('aboutUs')} />
                </Link>
            {isLoggedIn ? (
              <MenuItem onClick={handleLogout} label={t('logout')} />
            ) : (
              <>
                <Link href="/login"> 
                <MenuItem label={t('login')} />
                </Link>
                <Link href="/login"> 
                <MenuItem label={t('register')} />
                </Link>
              </>
            )}
            <div className="mt-auto flex flex-col items-center mb-8">
              <Link href="/" className='flex justify-center mb-4'>
                <div className='w-32'>
                  <Image alt='logo' src={profileImg} className='h-auto' />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={`hidden lg:flex flex-col cursor-pointer absolute rounded-xl shadow-md w-[40vw] md:w-[200%] bg-white overflow-hidden right-0 top-16 text-sm transition-transform duration-300 transform ${isOpen ? 'scale-100' : 'scale-0'}`}>
        {isLoggedIn ? (
          <>
          <Link href="/my-profile">    
                  <MenuItem label={t('myProfile')} />
          </Link>
          <Link href="/my-bookings">    
          <MenuItem label={t('myBookings')} />
          </Link>
            
          <MenuItem onClick={handleLogout} label={t('logout')} />
          </>
        ) : (
          <>
          <Link href="/login">         
             <MenuItem label={t('login')} />
          </Link>
          <Link href="/register">         
          <MenuItem label={t('register')} />
          </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginAccount;
