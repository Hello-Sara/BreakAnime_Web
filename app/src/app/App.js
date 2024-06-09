import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../stylesheets/Main.css';
import HomePage from '../pages/homepage/HomePage';
import AdminLogin from '../admin/pages/login/AdminLogin';
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
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
  );
}

export default App;
