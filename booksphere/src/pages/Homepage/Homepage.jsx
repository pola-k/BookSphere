import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'

export default function Homepage()
{
    return (
        <div className='flex flex-col grid grid-rows-[10%_90%] h-screen'>
            
            <Navbar/>

            {/* Main Block of Left Sidebar + Content + Recommendations */}
            <div className='grid grid-cols-[20%_20%_35%_25%] border-1 border-black'>

                <div className='col-span-1'>
                    <Sidebar/>
                </div>

                <div className='col-span-2 bg-black text-white text-center text-2xl'>
                    Main Content
                </div>

                <div className='col-span-1 text-center text-2xl'>
                    Recommendations..
                </div>

            </div>

        </div>
    )
}