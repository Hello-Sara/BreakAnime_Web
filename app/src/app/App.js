import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../stylesheets/Main.css';
import HomePage from '../pages/homepage/HomePage';


function App() {
 
  return (
        <Router>
          {/* <Header /> */}
          <Routes>
            {/* Autres */}
            <Route path='/' element={<HomePage/>} />
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
            {/* <Route path='/tarifs' element={<Tarifs />} /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
  );
}

export default App;
