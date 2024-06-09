import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../stylesheets/Main.css';

import HomePage from '../pages/homepage/HomePage';
import AdminLogin from '../admin/pages/login/AdminLogin';
import AdminHome from '../admin/pages/dashboard/AdminHome';
import AdminUser from '../admin/pages/admin-user/AdminUser';
import AdminAnime from '../admin/pages/admin-anime/AdminAnime';

import TagManager from 'react-gtm-module';


function App() {

  const tagManagerArgs = {
    gtmId: 'GTM-53PNCBVX'
  }
  TagManager.initialize(tagManagerArgs)
 
  return (
        <Router>
          {/* <Header /> */}
          <Routes>
            {/* Autres */}
            <Route path='/' element={<HomePage/>} />
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<AdminHome />} />
            <Route path='/admin/users' element={<AdminUser />} />      
            <Route path='/admin/animes' element={<AdminAnime />} />        
          </Routes>
          {/* <Footer /> */}
        </Router>
  );
}

export default App;
