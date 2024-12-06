import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationbar';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import AddRecipe from './components/addRecipe';


function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/**Display the Footer component when the URL changes */}
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
