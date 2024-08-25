"use client";

import { useEffect, useState, useRef } from 'react';
import Logo from './logo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDownIcon, FileTextIcon, VideoIcon, HelpCircleIcon, SendIcon, Radio, Globe} from 'lucide-react';
import LoginAccount from './LoginAccount';

Radio 

const navItems = [
  { href: '/', label: 'الرئيسية' },
  {
    href: '#', 
    label: 'المحتوي الطبي',
    subItems: [
      { href: '/blogs', label: 'مقالات طبية', icon: FileTextIcon },
      { href: '/videos', label: 'فيديوهات طبية', icon: VideoIcon },
      { href: '/podcasts', label: 'بودكاست قلقانة ', icon: Radio },
      { href: '/medical-questions', label: 'اسئلة طبية', icon: HelpCircleIcon },
      { href: '/ask-Doctor', label: 'ابعتلنا سؤالك', icon: SendIcon },
    ],
  },
  { href: '/booking-Doctor', label: 'احجز دكتور' },
  { href: '/aboutUs', label: 'من نحن' },
];

const Header = () => {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    setActiveItem(window.location.pathname);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDropdown = (label) => {
    setDropdownVisible(dropdownVisible === label ? '' : label);
  };

  const handleSubItemClick = () => {
    setDropdownVisible('');
  };

  const handleLinkClick = (e, item) => {
    if (item.subItems) {
      e.preventDefault();
      handleDropdown(item.label);
    } else {
      setActiveItem(item.href);
      router.push(item.href);
    }
  };

  return (
    <header id='header'>
      <div id='headerr' dir='' style={{ backgroundColor: "#f7f7f7" }} className="w-full  shadow-lg md:h-24 py-2 md:py-0 md:px-10 flex items-center justify-between fixed lg:top-0 top-0 left-0 right-0 z-50">
        <div className='flex items-center'>
          <div className='mx-5 md:mx-0 mb-[2px]'>
            <LoginAccount />
          </div>
          <nav className="hidden lg:flex justify-center text-primary items-center gap-8">
            <ul className="flex gap-2 items-center" ref={dropdownRef}>
              {navItems.map(item => (
                <li key={item.href} className="relative cursor-pointer">
                  <div onClick={(e) => handleLinkClick(e, item)}>
                    <a href={item.href}>
                      <div className='tajawal-medium text-[16px] font-ta px-3 rounded-xl transition duration-300 hover:bg-neutral-200 py-3 flex items-center'>
                        {item.label}
                        {item.subItems && <ChevronDownIcon className="mt-[2px]" />}
                      </div>
                    </a>
                  </div>
                  {item.subItems && dropdownVisible === item.label && (
                    <ul className={`absolute bg-white shadow-md rounded mt-1 ${item.label === 'من نحن' ? 'w-[160%]' : 'w-[120%]'}`}>
                      {item.subItems.map(subItem => (
                        <li key={subItem.href} onClick={handleSubItemClick}>
                          <Link href={subItem.href}>
                            <div className='tajawal-regular text-black font-ta px-3 py-3 hover:bg-neutral-200 transition duration-300 flex items-center gap-2'>
                              {subItem.icon && <subItem.icon className="text-primary ml-2" />}
                              {subItem.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              <li className="relative group">
                <button
                  disabled
                  className={`tajawal-medium text-[16px] px-2 py-3 text-slate-500/60 transition duration-300 ${dropdownVisible ? 'pointer-events-none' : ''}`}>
                  المتجر
                  <span className="absolute left-1/2 transform -translate-x-1/2 top-full mt-1 px-6 py-3 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                    انتظرونا
                  </span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="  mx-5 md:mx-0 flex  items-center md:gap-4 gap-2">
        <button className='tajawal-light flex items-center gap-1 md:gap-2   md:text-gray-500'>  <span className='text-black hidden md:block'>English </span><span className='text-black  rounded-full md:hidden '>EN </span> <Globe className='hidden md:block' size={18}/>  <span className='text-xl'> | </span> </button>
          <Logo />
       
          {/* <Link href={"/"} style={{ backgroundColor: "" }} className='flex md:hidden justify-center items-center'>
            <div className=''>
              <h1 className='text-5xl text-primary aref-ruqaa-bold'> قلقانة </h1>
            </div>
          </Link> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
