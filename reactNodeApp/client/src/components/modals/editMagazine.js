import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import { editMagazineInfo } from '../../http/magazineAPI';
import back from '../../images/back.jpg';
import { EditMagazineModalContainer, EditMagazineModalHeader, EditMagazineModalTittle, EditMagazineModalBody, EditMagazineFormContainer, EditMagazineCarouselContainer, EditMagazineCarouselItem,EditMagazineCarouselImage, EditMagazineCarouselCaption, EditMagazineFormField, EditMagazineFormCheckField, EditMagazineFormLabel, EditMagazineModalFooter, EditMagazineModalButton, EditMagazineImage } from '../../styles/editMagazine-style';


// Компонент, описывающий модальное окно, с формой на редактирование информации о журнале.
// При нажатии на соответствующую кнопку происходит запрос на функцию редактирования журнала.
// Компонент принимает параметры видимости, 
// при нажатии на соответствующие кнопки модальное окно исчезает.
// Также компонент принимает текущую информацию о журнале, 
// которая появляется в полях формы, после нажатия на кнопку. 
// Стили прописаны в папке styles.

const EditMagazine = observer(({show, onHide,data}) => {

    const [nameOriginal, setNameOriginal] = useState("");
    const [nameRus, setNameRus] = useState("");
    const [nameEng, setNameEng] = useState("");
    const [ISSNprint, setISSNprint] = useState("");
    const [ISSNonline, setISSNonline] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publisherEng, setPublisherEng] = useState("");
    const [scientificDirections, setScientificDirections] = useState("");
    const [webPage, setWebPage] = useState("");
    const [accessTextArticles, setAccessTextArticles] = useState("");
    const [dataStartArchieve, setDataStartArchieve] = useState("");
    const [dataEndArchieve, setDataEndArchieve] = useState("");
    const [embargoTerm, setEmbargoTerm] = useState("");
    const [prefixDOI, setPrefixDOI] = useState("");
    const [includedRSCI, setIncludedRSCI] = useState("");
    const [linkELibrary, setLinkELibrary] = useState("");
    const [accessArticleELibrary, setAccessArticleELibrary] = useState("");
    const [dataStartArchieveELibrary, setDataStartArchieveELibrary] = useState("");
    const [dataEndArchieveELibrary, setDataEndArchieveELibrary] = useState("");
    const [bibliometricIndicatorsRSCI, setBibliometricIndicatorsRSCI] = useState("");
    const [yearsIndexingScopus, setYearsIndexingScopus] = useState("");
    const [yearsIndexingWebOfScience, setYearsIndexingWebOfScience] = useState("");

    // Функция описывающая запрос на редактирование журнала.
    // После редактирования в базе данных страница, где находится этот компонент, перезагрузиться.
    const editMagazine = () => {
        
        editMagazineInfo(data.id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience)
        .then(window.location.reload(false));
    }

    const setGivenValuesInFields = () =>{
        setNameOriginal(data.nameOriginal);
        setNameRus(data.nameRus);
        setNameEng(data.nameEng);
        setISSNprint(data.ISSNprint);
        setISSNonline(data.ISSNonline);
        setPublisher(data.publisher);
        setPublisherEng(data.publisherEng);
        setScientificDirections(data.scientificDirections);
        setWebPage(data.webPage);
        setAccessTextArticles(data.accessTextArticles);
        setDataStartArchieve(data.dataStartArchieve);
        setDataEndArchieve(data.dataEndArchieve);
        setEmbargoTerm(data.embargoTerm);
        setPrefixDOI(data.prefixDOI);
        setIncludedRSCI(data.includedRSCI);
        setLinkELibrary(data.linkELibrary);
        setAccessArticleELibrary(data.accessArticleELibrary);
        setDataStartArchieveELibrary(data.dataStartArchieveELibrary);
        setDataEndArchieveELibrary(data.dataEndArchieveELibrary);
        setBibliometricIndicatorsRSCI(data.bibliometricIndicatorsRSCI);
        setYearsIndexingScopus(data.yearsIndexingScopus);
        setYearsIndexingWebOfScience(data.yearsIndexingWebOfScience);
    }

    // Вывод модального окна внутри страницы.
    // Для вывода формы используется тег Carousel из react-bootstrapю
    // Данный тег, позволяет делать слайдшоу, что использует для разбиения формы на несколько и переход между ними.
    // ВАЖНО! Слайдшоу невозможно без картинки.
    return (
        <EditMagazineModalContainer
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={onHide}
            centered

        >
            <EditMagazineModalHeader closeButton>
                <EditMagazineModalTittle>
                    Внесите необходимые изменения
                </EditMagazineModalTittle>
            </EditMagazineModalHeader>
            <EditMagazineModalBody>
                <EditMagazineFormContainer>
                    <EditMagazineModalButton variant="outline-dark" onClick={e=> setGivenValuesInFields()}>
                        <EditMagazineImage xmlns="http://www.w3.org/2000/svg" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                        </EditMagazineImage>
                        Получить текущие значения
                    </EditMagazineModalButton>
                    <EditMagazineCarouselContainer>
                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="First slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormLabel>
                                    Названия
                                </EditMagazineFormLabel>
                                <EditMagazineFormField
                                    value={nameOriginal}
                                    onChange={e => setNameOriginal(e.target.value)}
                                    placeholder="Оригинал"
                                />
                                <EditMagazineFormField
                                    value={nameRus}
                                    onChange={e => setNameRus(e.target.value)}
                                    placeholder="Русский"
                                />
                                <EditMagazineFormField
                                    value={nameEng}
                                    onChange={e => setNameEng(e.target.value)}
                                    placeholder="Английский"
                                />
                                
                                
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>

                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="Second slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormField
                                    value={publisher}
                                    onChange={e => setPublisher(e.target.value)}
                                    placeholder="Издатель"
                                />
                                <EditMagazineFormField
                                    value={publisherEng}
                                    onChange={e => setPublisherEng(e.target.value)}
                                    placeholder="Издатель(Eng)"
                                />
                                <EditMagazineFormField
                                    value={scientificDirections}
                                    onChange={e => setScientificDirections(e.target.value)}
                                    placeholder="Научные направления"
                                />
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>
                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="Third slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormCheckField
                                    value={includedRSCI}
                                    onChange={e => setIncludedRSCI(e.target.value)}
                                    label="Журнал входит в RSCI?"
                                />
                                <EditMagazineFormField
                                    value={bibliometricIndicatorsRSCI}
                                    onChange={e => setBibliometricIndicatorsRSCI(e.target.value)}
                                    placeholder="Библиометрический индикатор RSCI"
                                />
                                <EditMagazineFormField
                                    value={yearsIndexingScopus}
                                    onChange={e => setYearsIndexingScopus(e.target.value)}
                                    placeholder="Годы индексирования в Scopus"
                                />
                                <EditMagazineFormField
                                    value={yearsIndexingWebOfScience}
                                    onChange={e => setYearsIndexingWebOfScience(e.target.value)}
                                    placeholder="Годы индексирования в WebOfScience"
                                />
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>

                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="Fouth slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormField
                                    value={ISSNprint}
                                    onChange={e => setISSNprint(e.target.value)}
                                    placeholder="ISSN печатных изданий"
                                />
                                <EditMagazineFormField
                                    value={ISSNonline}
                                    onChange={e => setISSNonline(e.target.value)}
                                    placeholder="ISSN электронных изданий"
                                />
                                <EditMagazineFormField
                                    value={embargoTerm}
                                    onChange={e => setEmbargoTerm(e.target.value)}
                                    placeholder="Embargo term"
                                />
                                <EditMagazineFormField
                                    value={prefixDOI}
                                    onChange={e => setPrefixDOI(e.target.value)}
                                    placeholder="Префикс DOI"
                                />
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>

                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="Fivth slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormLabel>
                                    Сайт и прочее
                                </EditMagazineFormLabel>
                                <EditMagazineFormField
                                    value={webPage}
                                    onChange={e => setWebPage(e.target.value)}
                                    placeholder="Ссылка"
                                />
                                <EditMagazineFormField
                                    value={accessTextArticles}
                                    onChange={e => setAccessTextArticles(e.target.value)}
                                    placeholder="Доступ к научным статьям"
                                />
                                <EditMagazineFormField
                                    value={dataStartArchieve}
                                    onChange={e => setDataStartArchieve(e.target.value)}
                                    placeholder="Начала архивирования"
                                />
                                <EditMagazineFormField
                                    value={dataEndArchieve}
                                    onChange={e => setDataEndArchieve(e.target.value)}
                                    placeholder="Конца архивирования"
                                />
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>

                        <EditMagazineCarouselItem interval={100000}>
                            <EditMagazineCarouselImage
                                src={back}
                                alt="Sixth slide"
                            />
                            <EditMagazineCarouselCaption>
                                <EditMagazineFormLabel>
                                    ELibrary информация
                                </EditMagazineFormLabel>
                                <EditMagazineFormField
                                    value={linkELibrary}
                                    onChange={e => setLinkELibrary(e.target.value)}
                                    placeholder="Ссылка"
                                />
                                <EditMagazineFormField
                                    value={accessArticleELibrary}
                                    onChange={e => setAccessArticleELibrary(e.target.value)}
                                    placeholder="Доступ к статьм"
                                />    
                                <EditMagazineFormField
                                    value={dataStartArchieveELibrary}
                                    onChange={e => setDataStartArchieveELibrary(e.target.value)}
                                    placeholder="Год начала архивирования"
                                />
                                <EditMagazineFormField
                                    value={dataEndArchieveELibrary}
                                    onChange={e => setDataEndArchieveELibrary(e.target.value)}
                                    placeholder="Год конца архивирования"
                                />
                            </EditMagazineCarouselCaption>
                        </EditMagazineCarouselItem>
                    </EditMagazineCarouselContainer>
                </EditMagazineFormContainer>
            </EditMagazineModalBody>
            <EditMagazineModalFooter>
                <EditMagazineModalButton variant="outline-dark" onClick={onHide}>
                    Закрыть
                </EditMagazineModalButton>
                <EditMagazineModalButton variant="outline-dark" onClick={editMagazine}>
                    Редактировать
                </EditMagazineModalButton>
            </EditMagazineModalFooter>
        </EditMagazineModalContainer>
    );
});

export default EditMagazine;