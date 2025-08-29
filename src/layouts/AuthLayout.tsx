import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'

export const AuthLayout = () => {
  return (
    <div className='h-screen flex flex-col justify-center items-center '>
        <Outlet />
        <Toaster />
    </div>
  )
}
