import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../stylesheets/Main.css';

import HomePage from '../pages/homepage/HomePage';
import AdminLogin from '../admin/pages/login/AdminLogin';
import AdminHome from '../admin/pages/dashboard/AdminHome';

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
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
  );
}

export default App;
