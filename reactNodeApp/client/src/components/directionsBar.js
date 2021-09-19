import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { DirectionsBarContainer, DirectionsBarToggle, DirectionsBarImage, DirectionsBarMenu, DirectionsBarItem} from '../styles/directionsBar-style';

// Компонент описывает создание выпадающего списка из массива с научными направлениями.
// При нажатии на определенное направление происходит запрос на соответствующую функцию.
// Стили прописаны в папке styles.
const DirectionsBar = observer(() => {
    const {magazine} = useContext(Context);
    return (
        <DirectionsBarContainer >
            <DirectionsBarToggle autoClose={false} variant="black">
                <DirectionsBarImage xmlns="http://www.w3.org/2000/svg" class="bi bi-justify" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
                </DirectionsBarImage>
            </DirectionsBarToggle>
        
            <DirectionsBarMenu>
                {magazine.directions.map(direction =>
                    <DirectionsBarItem 
                        active={direction.direction === magazine.selectedDirection.direction}
                        onClick={() => magazine.setSelectedDirection(direction)}
                    >
                        {direction.direction}
                    </DirectionsBarItem>
                )}
            </DirectionsBarMenu>
        </DirectionsBarContainer>
    );
});

export default DirectionsBar;