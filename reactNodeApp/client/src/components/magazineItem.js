import React from 'react';
import {useHistory} from "react-router-dom";
import { MagazineItemContainer } from '../styles/magazineItem-style';
import {MAGAZINE_ROUTE} from "../utils/consts";


// Компонент описывает элемент списка из списка журналов в основной странице справочника.
// Выводиться краткая информация о журнале.
// Стили прописаны в папке styles.
const MagazineItem = ({magazine}) => {
    const history = useHistory();
    return (
        <MagazineItemContainer>
            {/* При клике внутри блока происходит перевод на страницу с подробной информацией о журнале.
            При этом берется id журнала. */}
            <div onClick={() => history.push(MAGAZINE_ROUTE + '/' + magazine.id)}>
                <h4>
                    {magazine.nameOriginal}
                </h4>
                <p>{magazine.nameEng}</p>
                <p>
                    Ссылка на онлайн ресурс: 
                    <a href = {magazine.webPage}>
                        {magazine.webPage || "   --"}
                    </a>
                </p>
                <hr/>
            </div>
        </MagazineItemContainer>
    );
};

export default MagazineItem;