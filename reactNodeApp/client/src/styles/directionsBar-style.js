import { Dropdown } from "react-bootstrap";
import styled from "styled-components";

export const DirectionsBarContainer = styled(Dropdown)`
    
`;


export const DirectionsBarToggle = styled(Dropdown.Toggle)`
`;


export const DirectionsBarImage = styled.svg`
    width: 3em;
    heigth: 3em;
    fill: white;
`;


export const DirectionsBarMenu = styled(Dropdown.Menu)`
    background-color: black;
`;


export const DirectionsBarItem = styled(Dropdown.Item)`
    color: white;
    font-size: 1.2em;
`;