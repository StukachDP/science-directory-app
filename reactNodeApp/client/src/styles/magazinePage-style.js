import { Button, Container } from "react-bootstrap";
import styled from "styled-components";

export const MagazinePageContainer = styled(Container)`
    margin-top: 1em;
`;

export const DivContainer = styled.div`
    display: inline;
    font-size: 1.2em;
`;

export const MainTittleContainer = styled.div`
    margin-bottom: 2em;
`;

export const NotMainTittle = styled.p`
    color: 	#808080;
    font-weight: bold;
`;

export const ButtonsContainer = styled.div`
    display: block;
    padding: 2em 0 2em 0;
`;

export const ButtonItem = styled(Button)`
    diplay: flex;
    margin-right: 0.5em;
    font-size: 1.2em;
    font-weight: bold;
    color: black;
    @media (max-width: 493px) {
        width: 100%;
        margin-bottom: 0.5em;
    }
    
`;