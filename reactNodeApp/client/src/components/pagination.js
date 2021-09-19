import React, {useContext,useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { PaginationContainer, PaginationButtons,PaginationButtonNext,PaginationButtonPrev} from '../styles/pagination-style';

// Компонент, описывающий блок цифр для пагинации.
// Всего количество цифр определяется из поля totalCount/limit объекта описания состояния.
// При нажатии на определенную цифру происходит обновление страницы внутри объекта состояния
// и выводится соответствующая информация в компоненте со списком журналов.
// Стили прописаны в папке styles. 
const Pagination = observer(() => {
    const {magazine} = useContext(Context);
    const pageCount = Math.ceil(magazine.totalCount / magazine.limit);
    const pages = [];

    // Состояние описывающее позицию меняющихся при нажатии на стрелочку цифр в блоке пагинации.
    const [changeItem, setChangeItem] = useState(3);

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    // Функция, в котороя выполняется вывод блока пагинации.
    // Если всего цифр меньше 6, то выводятся все числа, без кнопок со стрелками.
    // Иначе выводятся первая цифра, последняя, две стрелки и переменные числа, 
    // начиная с номера в состоянии changeItem.
    // После нажатия на стрелку changeItem увеличивается или уменьшается на 1.
    // Между стрелками выводится три числа, начиная с номера в состоянии changeItem.
    const paginationAdapting = () => {

        if(pages.length < 6){
            return (
                pages.map(page =>
                    <PaginationButtons
                        active={magazine.page === page}
                        onClick={() => magazine.setPage(page)}
                    >
                        {page}
                    </PaginationButtons>
                )
            );
        }else{
            let startItem = pages[0];
            let finishItem = pages[pages.length-1];

            const addChangeItem = ()=>{
                if(changeItem + 2 !== finishItem){
                    const result = changeItem + 1;
                    setChangeItem(result);
                }
            };

            const subsractChangeItem =()=> {
                if(changeItem - 2 !== startItem){
                    const result = changeItem - 1;
                    setChangeItem(result);
                }
            };
            
            return( 
                <>
                <PaginationButtons
                    active={magazine.page === startItem}
                    onClick={() => magazine.setPage(startItem)}
                >
                    {startItem}
                </PaginationButtons>
                <PaginationButtonPrev onClick = {() =>{subsractChangeItem()}}/>
                <PaginationButtons
                    active={magazine.page === (changeItem-1)}
                    onClick={() => magazine.setPage(changeItem-1)}
                >
                    {(changeItem-1)}
                </PaginationButtons>
                <PaginationButtons
                    active={magazine.page === changeItem}
                    onClick={() => magazine.setPage(changeItem)}
                >
                    {changeItem}
                </PaginationButtons>
                <PaginationButtons
                    active={magazine.page === (changeItem+1)}
                    onClick={() => magazine.setPage(changeItem+1)}
                >
                    {(changeItem+1)}
                </PaginationButtons>
                <PaginationButtonNext onClick = {() =>{addChangeItem()}}/>
                <PaginationButtons
                    active={magazine.page === finishItem}
                    onClick={() => magazine.setPage(finishItem)}
                >
                    {finishItem}
                </PaginationButtons>
                </>

            )
        }
    };

    return (
        <PaginationContainer>
            {paginationAdapting()}
        </PaginationContainer>
    );
});

export default Pagination;