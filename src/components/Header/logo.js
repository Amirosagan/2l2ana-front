import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/profile-imgr.png'


const Logo = () => {
  return (
    <div> 
    <Link href={"/"} style={{backgroundColor:""}} className='md:flex items-center'>
      <div style={{}} className=' md:w-32  w-16  '>
        <Image alt='logo' style={{   backgroundColor:"rgb(247 247 247)"}} src={profileImg} className='  h-auto'></Image>
        </div>
       
    </Link>
   
    </div>
  )
}
export default Logo