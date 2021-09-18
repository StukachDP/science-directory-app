import { Container, Dropdown,Navbar} from "react-bootstrap";
import styled from "styled-components";

export const NavBarMain = styled(Navbar)`
    background-color: black;

`;

export const NavBarContainer = styled(Container)`
`; 

export const NavBarBrand = styled(Navbar.Brand)`
    font-size: 1.5em;
    margin-right: auto;

    @media (max-width: 589px) {
        display: none;
    }
`;


export const NavBarBrandOnOthersPage = styled(Navbar.Brand)`
    font-size: 1.5em;
    margin-right: auto;
    margin-left: 0.5em;

    @media (max-width: 589px) {
        display: none;
    }
`;


export const UserDropdownContainer = styled(Dropdown)`
      margin-right: 4.5em;
`; 

export const UserDropdownToggle = styled(Dropdown.Toggle)`
`; 

export const UserDropdownImage = styled.svg`
    width: 3em;
    heigth: 3em;
    fill: white;
`;

export const UserDropdownMenu = styled(Dropdown.Menu)`
    background-color: black;
`; 

export const UserDropdownItem = styled(Dropdown.Item)`
    color: white;
    display: flex;
`; 