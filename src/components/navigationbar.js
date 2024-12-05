//Import reacts navigation bar
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//Set style of navbar and the links
const NavigationBar = () => {
  return (
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/header">Header</Nav.Link>
              <Nav.Link href="/footer">Footer</Nav.Link>
            </Nav>
          </Container>
      </Navbar>
  );
};

export default NavigationBar;