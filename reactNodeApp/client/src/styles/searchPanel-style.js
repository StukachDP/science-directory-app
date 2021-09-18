import {Button, FormControl, InputGroup} from "react-bootstrap";
import styled from "styled-components";


export const SearchField = styled(FormControl)`
    padding: 1em;
    margin-right: 0.1em;

`;

export const SearchPanelContainer = styled(InputGroup)`
    width: 60%;
    @media (max-width: 789px) {
        width: 100%;
    }
`;

export const SearchPanelButton = styled(Button)`
`;