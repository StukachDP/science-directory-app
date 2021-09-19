import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import MagazineItem from "./magazineItem";
import { MagazineListContainer } from '../styles/magazineList-style';

// Компонент описывающий список журналов.
// Состоит из компонентов элемент списка журнала.
// Стили прописаны в папке styles.
const MagazineList = observer(() => {
    const {magazine} = useContext(Context);

    // Функция, выполняющая запись в массив лимитированное количество журналов
    // (лимит определен в объекте состояния)
    // Используется для пагинации вывода журналов на страницу.
    const getLimitNumberOfMagazines = () => {
        const magazines = [];
        if(magazine.magazines.length !== 0){
            let startPoint = magazine.page * magazine.limit - magazine.limit;
            for (let index = 0; index < magazine.limit && startPoint < magazine.magazines.length; index++,startPoint++) {
                magazines.push(magazine.magazines[startPoint]);
                
            }
        }
        return magazines;
    };
    const magazines = getLimitNumberOfMagazines();

    return (
        <MagazineListContainer>
            {magazines.map(magazine =>
                    <MagazineItem key={magazine.id} magazine={magazine}/>
                )}
        </MagazineListContainer>
    );
});

export default MagazineList;