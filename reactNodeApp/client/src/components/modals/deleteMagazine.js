import React from 'react';
import {observer} from "mobx-react-lite";
import { deleteMagazineInfo } from '../../http/magazineAPI';
import {useHistory} from "react-router-dom";
import { DIRECTORY_ROUTE } from '../../utils/consts';
import { DeleteMagazineModalContainer, DeleteMagazineContainer, DeleteMagazineCaption, DeleteMagazineParagraph, DeleteMagazineButton } from '../../styles/deleteMagazine-style';




const DeleteMagazine = observer(({show, onHide,data}) => {

    const history = useHistory();
    const deleteMagazine = () => {
        
        deleteMagazineInfo(data.id)
        .then(data=>{history.push(DIRECTORY_ROUTE)
        window.location.reload(false)});
    };
    
    return (
        <DeleteMagazineModalContainer 
            show={show}
            onHide={onHide}
            centered
        >
            <DeleteMagazineContainer>
                <DeleteMagazineCaption>
                    Вы уверены, что хотите УДАЛИТЬ информацию об этом научном журнале?
                </DeleteMagazineCaption>
                <DeleteMagazineParagraph>
                    Вся информация о научном журнале "{data.nameOriginal}" будет удалена.
                    <br></br>
                    Id журнала: {data.id}.
                </DeleteMagazineParagraph>
                    
                <DeleteMagazineButton variant="outline-dark" onClick={onHide}>Закрыть</DeleteMagazineButton>
                <DeleteMagazineButton variant="outline-dark" onClick={deleteMagazine}>Удалить</DeleteMagazineButton>
            </DeleteMagazineContainer>
      </DeleteMagazineModalContainer>
    );
});

export default DeleteMagazine;