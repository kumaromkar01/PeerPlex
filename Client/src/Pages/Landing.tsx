import Insight from '../Component/Insight';
import Navbar from '../Component/Navbar'
import Welcome from '../Component/Welcome'
import Featured from '../Component/Featured';
import SavedBooks from '../Component/SavedBooks';
import LatestReviews from '../Component/LatestReviews';
function Landing() {
  return (
    <div>
      <Navbar/>
      <Welcome/>
      <Insight/>
      <div className='grid grid-cols-3 gap-4 bg-gray-900'>
        <Featured/>
        <div className='mt-11 lg:col-span-1 col-span-3'>
          <SavedBooks/>
          <LatestReviews/>
        </div>
      </div>
    </div>
  )
}

export default Landing;
