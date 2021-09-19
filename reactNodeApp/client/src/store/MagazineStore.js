import { makeAutoObservable } from "mobx";

// В данном файле описываются данные по журналам как состояние.
// Используется библиотека mobx.
// Ссылка на документацию: https://mobx.js.org/README.html
// Создаем класс, который описывает состояние информации по журналам.

export default class MagazineStore {
    
    constructor() {
        // Массив, куда будут записываться объекты с информацией о журнале
        this.magazines = [];

        // Статический массив научных направлений.
        // Используется в компоненте выпадающего списка.
        // Не зависит от базы данных.
        // Если в журнале появилось направление, которого здесь нет,
        // необходимо его добавить, чтобы по нему можно было осуществить поиск.
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

        // Поле, где будет храниться выбранное направление.
        this.selectedDirection = {};

        // Поле, где будет храниться данные, введенные при поиске по названию.
        this.searchingData = '';

        // Поля ниже нужны для осуществления пагинации 
        // (разбиения всего массива журналов на более маленькие и вывод этих частей на страницу)
        // Поле, где хранится номер страницы при выводе журналов.
        this.page = 1;
        // Поле, где хранится общее количество полученных объъектов журналов (длина массива)
        this.totalCount = 0;
        // Количество объектов, которое может быть выведено сразу на страницу.
        this.limit = 10;


        // Поле необходимое для описание состояния. 
        makeAutoObservable(this);
    }


    // Приведенные ниже функции вызываются тогда, когда необходимо обновить поле в объекте состояния.
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