'use client';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Link } from '@/src/i18n/routing';
import { checkSession } from '@/src/utils/auth';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const mdxComponents = {
  Image
};

const RenderMdx = ({ content }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      setIsClient(true);
      try {
        const sessionData = await checkSession();
        setIsLoggedIn(!!sessionData);
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkUserSession();
  }, []);

  const preview = !isLoggedIn;
  const previewContent = preview ? content.split(' ').slice(0, 100).join(' ') + '...' : content;

  return (
    <div className={preview ? 'custom-quill preview' : 'custom-quill'}>
      {isClient && (
        <>
          <ReactQuill
            value={previewContent}
            readOnly={true}
            theme="bubble"
            modules={{ toolbar: false }}
          />
          {preview && (
            <div className="mt-8 mb-10 p-8 rounded-lg shadow-2xl bg-white">
              <p className="text-center tajawal-regular text-black mb-4">
                يرجى تسجيل الدخول لعرض المحتوى الكامل. التسجيل مجاني!
              </p>
              <Link href="/login">
                <div className="rounded bg-primary tajawal-bold text-white px-4 py-2 cursor-pointer text-center">
                  تسجيل الدخول
                </div>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RenderMdx;
