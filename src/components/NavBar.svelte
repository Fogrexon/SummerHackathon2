<script lang="ts">
    import {
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
    } from 'sveltestrap';

    let isOpen = false;
    const toggle = () => (isOpen = !isOpen);
    </script>
  
  <Navbar color="light" light>
    <NavbarBrand href="/" class="mr-auto">hacktrip</NavbarBrand>
    <NavbarToggler on:click={toggle} className="mr-2" />
    <Collapse {isOpen} navbar>
      <Nav navbar>
        <NavItem>
          <NavLink href="#components/">Current Location</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#AboutUs">About</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>