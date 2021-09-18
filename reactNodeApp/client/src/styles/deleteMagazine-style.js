import { Button, Modal } from "react-bootstrap";
import styled from "styled-components";

export const DeleteMagazineModalContainer = styled(Modal)`
    padding: 0.5em;
`;

export const DeleteMagazineContainer = styled.div`
    padding: 1em;
    color: black;
`;

export const DeleteMagazineCaption = styled.h3`
    font-weight: bold;
    margin-bottom: 1em;
`;

export const DeleteMagazineParagraph = styled.p`
    font-size: 1.2em;
    margin-bottom: 3em;
`;

export const DeleteMagazineButton = styled(Button)`
    width: 100%;
    margin-bottom: 1em;
    font-size: 1.3em;
    font-weight: bold;

`;