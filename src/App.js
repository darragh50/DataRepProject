import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigationbar';
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import AddRecipe from './components/addRecipe';
import EditRecipe from './components/editRecipe';
import Read from './components/read';



function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        {/**Display the Footer component when the URL changes */}
        <Route path="/" element={<Home />} />
        <Route path="/read" element={<Read />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/editRecipe/:id" element={<EditRecipe />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
