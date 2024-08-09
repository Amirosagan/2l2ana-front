import Image from 'next/image'
import Link from 'next/link'
import profileImg from '@/public/profile-imgr.png'


const Logo = () => {
  return (
    <div> 
    <Link href={"/"} style={{backgroundColor:""}} className='md:flex hidden items-center'>
      <div style={{}} className=' w-32   '>
        <Image alt='logo' style={{padding:"px", backgroundColor:"rgb(247 247 247)"}} src={profileImg} className='  h-auto'></Image>
        </div>
       
    </Link>
   
    </div>
  )
}
export default Logo