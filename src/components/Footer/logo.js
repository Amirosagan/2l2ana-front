import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/profile-img.png'
import Facebook from '@/public/facebook.png'
import Instagram from '@/public/instagram.png'
import Youtube from '@/public/youtube.png'


const Logo = () => {
  return (
    <Link href={"/"} className='flex items-center text-dark'>
      <div className='w-32 fixed top-3 left-6 rounded-xl overflow-hidden border border-solid border-dark mr-4 '>
        <Image alt='logo' src={profileImg} className='w-full h-auto '></Image>
        </div>
      
    </Link>
  )
}
export default Logo