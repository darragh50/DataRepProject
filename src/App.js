import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationbar';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/**Display the Footer component when the URL changes */}
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
