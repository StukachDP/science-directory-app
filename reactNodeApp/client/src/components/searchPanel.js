import React, {useContext,useState} from 'react';
import {observer} from "mobx-react-lite";
import { Context } from '..';
import { SearchField, SearchPanelContainer, SearchPanelButton } from '../styles/searchPanel-style';


// Компонент, в котором описано создание поля ввода информации для поиска журналов по названию
// При нажатии на соответствующую кнопку идет запрос на функцию поиска.
// Стили прописаны в папке styles
const SearchPanel = observer(() => {
    const {magazine} = useContext(Context);
    const [searchingData, setSearchingInfo] = useState('');

    return (
            <SearchPanelContainer>
                <SearchField
                    value = {searchingData} 
                    placeholder={"Введите информацию для поиска"}
                    onChange={e=>setSearchingInfo(e.target.value)}
                    onKeyPress={e=>{
                        if(e.which === 13){
                            magazine.setSearchingData(searchingData)
                        }
                    }}
                />
                <SearchPanelButton 
                    variant="outline-primary"
                    onClick={()=>magazine.setSearchingData(searchingData)}
                >
                    Поиск
                </SearchPanelButton>
            </SearchPanelContainer>
    );
});

export default SearchPanel;