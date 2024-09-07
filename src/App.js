import ContactUs from './components/contactus.jsx'
import ContactsList from './components/contactlist.jsx';
import NavSection from './components/navsection.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>

    <div>
      <header>
        <NavSection />
      </header>
      <div className="sm:pl-16 sm:pr-16 xl:w-[1280px] mx-auto">
        <Routes>
          <Route path="/" element={<ContactUs />} />
          <Route path="/contacts" element={<ContactsList/>} />
        </Routes>
        
        <footer>
          @copyright
        </footer>
      </div>
    </div>

    </Router>
  );
}

export default App;
