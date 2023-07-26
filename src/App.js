import './App.css';
import './responsive.css';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Contact from './pages/Contact';
import About from './pages/About';
import Faq from './pages/Faq';
import Help from './pages/Help';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Dashboard from './pages/Dashboard';
import TrialEnded from './pages/TrialEnded';
import Verification from './pages/Verification';
import Feedback from './pages/Feedback';
import Checkout from './pages/Checkout';
import ThankYou from './pages/ThankYou';
import Pricing from './pages/Pricing';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/about' element={<About />} />
          <Route path='/faq' element={<Faq />} />
          <Route path='/help' element={<Help />} />
          <Route path='/privacyPolicy' element={<PrivacyPolicy />} />
          <Route path='/termsOfService' element={<TermsOfService />} />
          <Route path='/dashboard/*' element={<Dashboard />} />
          <Route path='/trialEnded' element={<TrialEnded />} />
          <Route path='/0239-3495-9304-4835' element={<Verification />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/pricing' element={<Pricing />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thankYou' element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
