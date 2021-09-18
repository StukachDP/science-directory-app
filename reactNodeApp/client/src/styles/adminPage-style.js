import { Button, Container } from "react-bootstrap";
import styled from "styled-components";

export const AdminPageContainer = styled(Container)`
    display: flex;
    
`;

export const AdminPageButton = styled(Button)`
    margin-top: 1em;
    width: 100%;
    margin-right: 4.5em;
    font-size: 1.2em;
    font-weight: bold;
    color: black;
    @media (max-width: 589px) {
        margin-left: 1em;
        margin-right: 1em;
    }


`;