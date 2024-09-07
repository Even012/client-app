import ContactUs from './components/contactus.jsx'
import ContactsList from './components/contactlist.jsx';
import NavSection from './components/navsection.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer.jsx';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>

    <Box sx={{height: '100vh'}}> 
      <header>
        <NavSection />
      </header>

      <Box className="pl-4 pr-4 sm:pl-16 sm:pr-16 xl:w-[1280px] mx-auto">
        <Routes >
          <Route path="/" element={<ContactUs />} />
          <Route path="/contacts" element={<ContactsList/>} />
        </Routes>

        <Footer/>
      </Box>
    </Box>

    </Router>
  );
}

export default App;
