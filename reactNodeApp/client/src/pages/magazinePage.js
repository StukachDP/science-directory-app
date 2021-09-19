import React, {useEffect, useState,useContext} from 'react';
import {useParams} from 'react-router-dom';
import { Context } from '..';
import DeleteMagazine from '../components/modals/deleteMagazine';
import EditMagazine from '../components/modals/editMagazine';
import {getMagazineInfo} from "../http/magazineAPI";
import { MagazinePageContainer, DivContainer, MainTittleContainer, NotMainTittle, ButtonsContainer, ButtonItem } from '../styles/magazinePage-style';

// Страница со всей информацией о конкретном журнале.
const MagazinePage = () => {
    const [magazine, setMagazine] = useState({});
    const {user} = useContext(Context);
    const [scientificDirections, setScientificDirections] = useState([]);

    // Состояние всплывающих окон на редактирование или удаление информации по журналу.
    // При нажатии на кнопку состояние меняется и модальное окна появляется.
    const [editMagazineForm, setEditMagazineForm] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);

    // Переменная id, которая берется из строки запроса.
    const {id} = useParams();
    

    // Эффект, вызвающий функцию получения данных по журналу с выбранным id.
    // Обновление поля в объекте состояния.
    useEffect(() => {
        getMagazineInfo(id).then(data => {
            setMagazine(data.data)
            setScientificDirections(data.data.scientificDirections.split(" "))
    })}, []);

    // Вывод полученной после эффекта информации внутри HTML-тегов
    // Стили прописаны в соответствующем файле в папке styles
    return (
        <MagazinePageContainer>
                <DivContainer>
                    <MainTittleContainer>
                        <h2>
                            {magazine.nameOriginal}
                        </h2>
                        <NotMainTittle>
                            {magazine.nameRus}
                        </NotMainTittle>
                        <NotMainTittle>
                            {magazine.nameEng}
                        </NotMainTittle>
                    </MainTittleContainer>
                    <div>
                        <p>
                            Издатель: {magazine.publisher} / {magazine.publisherEng}
                        </p>
                        <p>
                            Научные направления:
                        </p>
                        <ul>
                            {scientificDirections.map(direction =>
                                <li>{direction}</li>
                            )}
                        </ul>
                    </div>
                    <hr/>
                    
                    <div>
                        <p>
                            Ссылка на онлайн ресурс: &#160;  
                            <a href = {magazine.webPage}>
                                {magazine.webPage || "   --"}
                            </a>
                        </p>
                        <p>
                            Доступ к научным статьям: {magazine.accessTextArticles}
                        </p>
                        <p>
                            Годы архивирования: {magazine.dataStartArchieve}-{magazine.dataEndArchieve}
                        </p>
                        <hr/>
                        <p>
                            Ссылка на ELibrary:  &#160;
                            <a href = {magazine.linkELibrary}>
                                {magazine.linkELibrary || "   --"}
                            </a>
                        </p>
                        <p>
                            Доступ к научным статьям на ELibrary: {magazine.accessArticleELibrary}
                        </p>
                        <p>
                            Годы архивирования на ELibrary: {magazine.dataStartArchieveELibrary}-{magazine.dataEndArchieveELibrary}
                        </p>
                        <hr/>
                    </div>
                    <div>
                        <p>
                            Печатный ISSN: {magazine.ISSNprint}
                        </p>
                        <p>
                            Онлайн ISSN: {magazine.ISSNonline}
                        </p>
                        <p>
                            Показатель Эмбарго: {magazine.embargoTerm || "-"}
                        </p>
                        <p>
                            Префикс DOI (Digital object identifier / Цифровой идентификатор объекта): {magazine.prefixDOI}
                        </p>
                        <hr/>
                    </div>
                    <div>
                        <p>
                            Входит в РИНЦ (Российский индекс научного цитирования): {magazine.includedRSCI? "Да":"Нет"}
                            <br/>
                            {magazine.includedRSCI? `Библиометрический идентификатор РИНЦ: ${magazine.bibliometricIndicatorsRSCI}`:""}
                        </p>
                        <p>
                            {magazine.yearsIndexingScopus? `Годы индексирования в Scopus: ${magazine.yearsIndexingScopus}`
                            :" "}
                        </p>
                        <p>
                            {magazine.yearsIndexingWebOfScience? `Годы индексирования в Web Of Science: ${magazine.yearsIndexingWebOfScience}`: " "}
                        </p>
                    </div>
                </DivContainer>

                {/* Если пользователь авторизован, то появляются кнопки на удаление/редактирование журнала */}
                {user.isAuth?
                    <ButtonsContainer>
                        <ButtonItem 
                            variant={"outline-dark"}
                            onClick={() => {
                                setAlertVisible(true)
                            }}
                        >
                            Удалить журнал
                        </ButtonItem>
                        <DeleteMagazine show={alertVisible} onHide={()=>setAlertVisible(false)} data={magazine}/>
                        <ButtonItem
                            variant={"outline-dark"}
                            onClick={() => {
                                setEditMagazineForm(true)
                            }}
                        >
                            Редактировать информацию о журнале
                        </ButtonItem>
                        <EditMagazine show={editMagazineForm} onHide={() => setEditMagazineForm(false)} data={magazine}/>
                    </ButtonsContainer>
                    :
                    <ButtonsContainer></ButtonsContainer>
                }    
        </MagazinePageContainer>
    );
};

export default MagazinePage;