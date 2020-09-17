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
    <NavbarBrand href="/" class="mr-auto"><img src="/images/logo.svg" alt="hacktrip logo" height="60px"></NavbarBrand>
    <NavbarToggler on:click={toggle} className="mr-2" />
    <Collapse {isOpen} navbar>
      <Nav navbar>
        <NavItem>
          <NavLink href="/#/current/">Current Location</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/#/about">About</NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>