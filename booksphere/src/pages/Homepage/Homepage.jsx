import Navbar from '../../components/navbar'
import Sidebar from '../../components/sidebar'
import HomeFeed from '../../components/home-feed'
import RecommendationsFeed from '../../components/recommendations-feed'

export default function Homepage()
{
    return (
        <div className='flex flex-col grid grid-rows-[8%_92%] h-screen'>
            
            <Navbar/>

            {/* Main Block of Left Sidebar + Content + Recommendations */}
            <div className='grid grid-cols-[20%_20%_35%_25%] border-1 border-[var(--bordercolor)]'>

                <div className='col-span-1 overflow-y-auto'>
                    <Sidebar/>
                </div>

                <div className='col-span-2 h-full overflow-y-auto border-1 px-[3vw] py-[4vh] text-2xl border-[var(--bordercolor)]'>
                    <HomeFeed/>
                </div>

                <div className='col-span-1 border-1 px-[1.5vw] py-[3vh] h-full overflow-y-auto border-[var(--bordercolor)]'>
                    <RecommendationsFeed/>
                </div>

            </div>

        </div>
    )
}