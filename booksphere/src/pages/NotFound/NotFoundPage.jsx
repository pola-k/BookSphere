import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'

export default function NotFoundPage() {
    return (
        <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
            <Navbar />

            <img src="/images/404_error.jpg" alt="Logo-Text" className="h-full w-full" />

        </div>
    )
}
