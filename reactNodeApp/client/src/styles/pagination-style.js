import styled from "styled-components";
import {Pagination} from "react-bootstrap";


export const PaginationContainer = styled(Pagination)`
    margin-top: 3em;
    display: flex;
    justify-content: left;
    
`;

export const PaginationButtons = styled(Pagination.Item)`
    font-size: 1.2em;
`;

export const PaginationButtonNext = styled(Pagination.Next)`
    font-size: 1.2em;
`;

export const PaginationButtonPrev = styled(Pagination.Prev)`
    font-size: 1.2em;
`;