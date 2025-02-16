import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'

export default function Homepage()
{
    return (
        <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
            
            <Navbar/>

            {/* Main Block of Left Sidebar + Content + Recommendations */}
            <div className='grid grid-cols-[20%_20%_35%_25%] border-1' style={{backgroundColor: "var(--bgcolordark)", borderColor: "var(--bordercolor)"}}>

                <div className='col-span-1 overflow-y-auto'>
                    <Sidebar/>
                </div>

                <div className='col-span-2 border-1 text-black text-center text-2xl' style={{borderColor: "var(--bordercolor)"}}>
                    Main Content
                </div>

                <div className='col-span-1 text-center text-2xl border-1' style={{borderColor: "var(--bordercolor)"}}>
                    Recommendations..
                </div>

            </div>

        </div>
    )
}