import { makeAutoObservable } from "mobx";

export default class MagazineStore {
    
    constructor() {
        this.magazines = [];
        this.directions = [
            {direction: "Биологические"},
            {direction: "Военные"},
            {direction: "Географические"},
            {direction: "Геолого-минералогические"},
            {direction: "Исторические"},
            {direction: "Медицинские"},
            {direction: "Педагогические"}, 
            {direction: "Политические"},
            {direction: "Сельскохозяйственные"},
            {direction: "Социологические"},
            {direction: "Технические"},
            {direction: "Физико-математические"},
            {direction: "Филологические"},
            {direction: "Философские"},
            {direction: "Химические"},
            {direction: "Экономические"},
            {direction: "Юридические"}
        ];
        this.selectedDirection = {};
        this.searchingData = '';
        this.page = 1;
        this.totalCount = 0;
        this.limit = 10;
        makeAutoObservable(this);
    }

    setMagazines(magazines) {
        this.setPage(1)
        this.magazines = magazines;
    }

    setSelectedDirection(direction) {
        this.selectedDirection = direction;
    }

    setSearchingData(searchingData){
        this.searchingData = searchingData;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalCount(totalCount) {
        this.totalCount = totalCount;
    }

    setLimit(limit) {
        this.limit = limit;
    }
}