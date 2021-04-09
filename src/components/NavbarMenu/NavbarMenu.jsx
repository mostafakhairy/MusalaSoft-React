import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function NavbarMenu({ routes }) {
  return (
    <Navbar bg="primary" expand="md" variant="dark">
      <Navbar.Brand>
        <img src="" width="20"></img> MusalaSoft
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {routes.map(
            (route) =>
              !route.hidden && (
                <NavLink
                  to={route.path}
                  key={route.path}
                  activeStyle={{
                    fontWeight: 'bold',
                    color: 'White',
                  }}
                >
                  {route.name}
                </NavLink>
              )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
