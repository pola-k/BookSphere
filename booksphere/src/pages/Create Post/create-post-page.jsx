import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import CreatePostModal from "../../components/create-post-modal"

export default function CreatePostPage() {

    return (
        <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
            
            <Navbar/>

            <div className='grid grid-cols-[20%_20%_35%_25%] border-1 border-[var(--bordercolor)]'>

                <div className='col-span-1 overflow-y-auto'>
                    <Sidebar/>
                </div>

                <div className='col-span-3 h-full overflow-y-auto border-1 px-[8vw] py-[6vh] text-2xl border-[var(--bordercolor)]'>
                    <CreatePostModal/>
                </div>

            </div>

        </div>
    )
}