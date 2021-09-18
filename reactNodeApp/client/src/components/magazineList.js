import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import MagazineItem from "./magazineItem";
import { MagazineListContainer } from '../styles/magazineList-style';


const MagazineList = observer(() => {
    const {magazine} = useContext(Context);
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