import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'


export const LayoutAdmin = () => {
  return (
    <>
      <Header />
      <div className='flex gap-3 px-2'>
        <Outlet />
      </div>
    </>
  )
}
