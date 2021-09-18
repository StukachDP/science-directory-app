import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import SearchPanel from '../components/searchPanel';
import Pagination from '../components/pagination';
import MagazineList from '../components/magazineList';
import { getMagazines, getMagazinesByScientificDirections,getMagazinesByTitle } from '../http/magazineAPI';
import { DirectoryContainer } from '../styles/directoryPage-style';

const Directory = observer(() => {
    const {magazine} = useContext(Context);

    useEffect(() => {
        getMagazines().then(data=>{
            magazine.setMagazines(data.data)
            magazine.setSelectedDirection({})
            magazine.setSearchingData('')
            magazine.setTotalCount(data.data.length)
        })
    }, []);


    useEffect(() => {
        if(magazine.selectedDirection.direction !== undefined){
            getMagazinesByScientificDirections(magazine.selectedDirection.direction).then(data=>{
                magazine.setMagazines(data.data)
                magazine.setSearchingData('')
                magazine.setTotalCount(data.data.length)
            })
        }
        
    }, [magazine.selectedDirection]);


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