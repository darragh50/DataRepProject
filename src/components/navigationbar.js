//Import reacts navigation bar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Set style of navbar and the links
const NavigationBar = () => {
  return (
    <Navbar className="custom-navbar" bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/addRecipe">Add Recipes</Nav.Link>
              <Nav.Link href="/read">View Recipes</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;