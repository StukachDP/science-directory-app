import React from 'react';
import {observer} from "mobx-react-lite";
import { deleteMagazineInfo } from '../../http/magazineAPI';
import {useHistory} from "react-router-dom";
import { DIRECTORY_ROUTE } from '../../utils/consts';
import { DeleteMagazineModalContainer, DeleteMagazineContainer, DeleteMagazineCaption, DeleteMagazineParagraph, DeleteMagazineButton } from '../../styles/deleteMagazine-style';


// Компонент, описывающий модальное окно, с подтверждающим сообщением на удаление информации о журнале.
// При нажатии на соответствующую кнопку происходит запрос на функцию удаления журнала.
// Компонент принимает параметры видимости и информацию о журнале, который нужно будет удалить. 
// Стили прописаны в папке styles.
const DeleteMagazine = observer(({show, onHide,data}) => {

    // Функция, необходимая для осуществения перехода между страницами.
    const history = useHistory();

    // Функция, внутри которой происходит запрос на удаление информации о журнале.
    // После удаления происходит переход на основную страницу справочника.
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