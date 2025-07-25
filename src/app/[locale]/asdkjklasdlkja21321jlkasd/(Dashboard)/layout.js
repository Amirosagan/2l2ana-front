'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from "@/src/components/admin/navbar";
import Sidebar from "@/src/components/admin/sidebar";
import { checkSession } from '@/src/utils/auth';
import '@/src/app/globals.css';

export default function AdminLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      const sessionData = await checkSession();

      if (sessionData) {

        if (sessionData.session.role === 'Admin') {
          setIsLoggedIn(true);
          setUser(sessionData.session);
          setLoading(false);
        } else {
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    };

    verifySession();
  }, [router]);



  return (
    <div className="flex">
      <div  className="w-72 bg-primary fixed h-[100vh]">
        <Sidebar />
      </div>
      <div className="content ml-72 flex-1 p-5">
        <Navbar />
        
        {children}
      </div>
    </div>
  );
}
