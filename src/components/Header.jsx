import { Link } from 'react-router-dom';
import Profile from '../assets/img/perfil.jpeg'

export const Header = () => {
  return (
    <nav className='shadow-md flex justify-between items-center py-4 mb-4'>
    <div className='ml-4 flex gap-2 items-center'>
      <Link to="/home" className="text-md font-bold text-primary  tracking-[1px] 
      sm:tracking-[3px] sm:text-2xl"
      >Pharmanet</Link>
    </div>
    <div className='relative mr-4'>
      <button className='flex items-center text-gray-700' >
        <img src={Profile} alt="profile user" className='h-8 w-8 rounded-full' />
        <span className='ml-2 text-sm hidden sm:block'>Juan Castañeda</span>
      </button>
    </div>
  </nav>
  )
}
