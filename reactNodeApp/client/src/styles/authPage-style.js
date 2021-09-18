import { Button, Card, Container, Form } from "react-bootstrap";
import styled from "styled-components";


export const AuthPageContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6em 2em 0 2em;
`;

export const AuthPageLogRegCard = styled(Card)`
    padding: 2em;
    width: 70%;
    @media (max-width: 767px) {
        width: 100%;
        padding: 1em;
    }
    @media (max-width: 270px) {
        padding: 1em;
    }
`;

export const AuthPageCardCaption = styled.h3`
    text-align: center;
    @media (max-width: 270px) {
        font-size: 1em;
        font-weight: bold;
    }
`;

export const AuthPageFormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
`;

export const AuthPageFormItem = styled(Form.Control)`
    margin-top: 1em;
    width: 100%;
`;

export const AuthPageFormButton = styled(Button)`
    margin-top: 3em;
    font-size: 1.2em;
    font-weight: bold;
    width: 100%;
    color: black;

`;