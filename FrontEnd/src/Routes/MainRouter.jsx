import {Routes, Route} from 'react-router-dom';
import Home from '../Pages/Home';
import FindDonor from '../Pages/FindDonor';
import BloodBanks from '../Pages/BloodBanks';
import DashBoard from '../Pages/DashBoard';

const MainRouter = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/findDonor' element={<FindDonor/>}/>
        <Route path='/bloodBanks' element={<BloodBanks/>}/>
        <Route path='/dashBoard' element={<DashBoard/>}/>

    </Routes>
    
  )
}

export default MainRouter;