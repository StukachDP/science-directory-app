import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import SearchPanel from '../components/searchPanel';
import Pagination from '../components/pagination';
import MagazineList from '../components/magazineList';
import { getMagazines, getMagazinesByScientificDirections,getMagazinesByTitle } from '../http/magazineAPI';
import { DirectoryContainer } from '../styles/directoryPage-style';


// Основная страница справочника.
// Страница состоит из списка журналов, поля ввода данных для поиска и блока пагинации.
const Directory = observer(() => {
    const {magazine} = useContext(Context);

    // Эффект, который вызывает функцию получения всех журналов 
    // и сохраняет полученные данные в поле объекта класса, который описывает состояние полученных данных.
    // Также обновляются поля, которые отвечают за пагинацию данных на странице.
    // Эффект срабатывает всякий раз, когда страница загружается.
    useEffect(() => {
        getMagazines().then(data=>{
            magazine.setMagazines(data.data)
            magazine.setSelectedDirection({})
            magazine.setSearchingData('')
            magazine.setTotalCount(data.data.length)
        })
    }, []);

    // Эффект, который вызывает функцию получения всех журналов с определенным научным направлением
    // и сохраняет полученные данные в поле объекта класса, который описывает состояние полученных данных.
    // Также обновляются поля, которые отвечают за пагинацию данных на странице.
    // Эффект срабатывает тогда, когда выбрано научное направление.
    useEffect(() => {
        if(magazine.selectedDirection.direction !== undefined){
            getMagazinesByScientificDirections(magazine.selectedDirection.direction).then(data=>{
                magazine.setMagazines(data.data)
                magazine.setSearchingData('')
                magazine.setTotalCount(data.data.length)
            })
        }
        
    }, [magazine.selectedDirection]);


    // Эффект, который вызывает функцию получения всех журналов с определенным названием
    // и сохраняет полученные данные в поле объекта класса, который описывает состояние полученных данных.
    // Также обновляются поля, которые отвечают за пагинацию данных на странице.
    // Эффект срабатывает тогда, когда запущен поиск журналов по названию
    useEffect(() => {
        getMagazinesByTitle(magazine.searchingData).then(data=>{
            magazine.setMagazines(data.data)
            magazine.setSelectedDirection({})
            magazine.setTotalCount(data.data.length)
        })
    }, [magazine.searchingData]);



    return (
        <DirectoryContainer>
                <SearchPanel/>
                <MagazineList/>
                <Pagination/>
        </DirectoryContainer>
    );
});

export default Directory;