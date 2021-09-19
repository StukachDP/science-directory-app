import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import { createMagazine } from '../../http/magazineAPI';
import back from '../../images/back.jpg';
import { CreateMagazineModalContainer, CreateMagazineModalHeader, CreateMagazineModalTittle, CreateMagazineModalBody, CreateMagazineFormContainer, CreateMagazineCarouselContainer, CreateMagazineCarouselItem,CreateMagazineCarouselImage, CreateMagazineCarouselCaption, CreateMagazineFormField, CreateMagazineFormCheckField, CreateMagazineFormLabel, CreateMagazineModalFooter, CreateMagazineModalButton } from '../../styles/createMagazine-style';

// Компонент, описывающий модальное окно, с формой о добавлении информации о журнале.
// При нажатии на соответствующую кнопку происходит запрос на функцию добавления журнала.
// Компонент принимает параметры видимости, при нажатии на соответствующие кнопки модальное окно исчезает. 
// Стили прописаны в папке styles.

const CreateMagazine = observer(({show, onHide}) => {
    
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

    // Функция описывающая запрос на добавление журнала.
    // После добавления в базу данных страница, где находится этот компонент, перезагрузиться.
    const addMagazine = () => {
        createMagazine(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience)
        .then(window.location.reload(false));
    }


    // Вывод модального окна внутри страницы.
    // Для вывода формы используется тег Carousel из react-bootstrapю
    // Данный тег, позволяет делать слайдшоу, что использует для разбиения формы на несколько и переход между ними.
    // ВАЖНО! Слайдшоу невозможно без картинки.
    return (
        <CreateMagazineModalContainer
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            show={show}
            onHide={onHide}
            centered
        >
            <CreateMagazineModalHeader closeButton>
                <CreateMagazineModalTittle>
                    Введите информацию о журнале
                </CreateMagazineModalTittle>
            </CreateMagazineModalHeader>
            <CreateMagazineModalBody>
                <CreateMagazineFormContainer>
                    <CreateMagazineCarouselContainer>
                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="First slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormLabel>
                                    Названия
                                </CreateMagazineFormLabel>
                                <CreateMagazineFormField
                                    value={nameOriginal}
                                    onChange={e => setNameOriginal(e.target.value)}
                                    placeholder="Оригинал"
                                />
                                <CreateMagazineFormField
                                    value={nameRus}
                                    onChange={e => setNameRus(e.target.value)}
                                    placeholder="Русский"
                                />
                                <CreateMagazineFormField
                                    value={nameEng}
                                    onChange={e => setNameEng(e.target.value)}
                                    placeholder="Английский"
                                />
                                
                                
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>

                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="Second slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormField
                                    value={publisher}
                                    onChange={e => setPublisher(e.target.value)}
                                    placeholder="Издатель"
                                />
                                <CreateMagazineFormField
                                    value={publisherEng}
                                    onChange={e => setPublisherEng(e.target.value)}
                                    placeholder="Издатель(Eng)"
                                />
                                <CreateMagazineFormField
                                    value={scientificDirections}
                                    onChange={e => setScientificDirections(e.target.value)}
                                    placeholder="Научные направления"
                                />
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>
                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="Third slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormCheckField
                                    value={includedRSCI}
                                    onChange={e => setIncludedRSCI(e.target.value)}
                                    label="Журнал входит в RSCI?"
                                />
                                <CreateMagazineFormField
                                    value={bibliometricIndicatorsRSCI}
                                    onChange={e => setBibliometricIndicatorsRSCI(e.target.value)}
                                    placeholder="Библиометрический индикатор RSCI"
                                />
                                <CreateMagazineFormField
                                    value={yearsIndexingScopus}
                                    onChange={e => setYearsIndexingScopus(e.target.value)}
                                    placeholder="Годы индексирования в Scopus"
                                />
                                <CreateMagazineFormField
                                    value={yearsIndexingWebOfScience}
                                    onChange={e => setYearsIndexingWebOfScience(e.target.value)}
                                    placeholder="Годы индексирования в WebOfScience"
                                />
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>

                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="Fouth slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormField
                                    value={ISSNprint}
                                    onChange={e => setISSNprint(e.target.value)}
                                    placeholder="ISSN печатных изданий"
                                />
                                <CreateMagazineFormField
                                    value={ISSNonline}
                                    onChange={e => setISSNonline(e.target.value)}
                                    placeholder="ISSN электронных изданий"
                                />
                                <CreateMagazineFormField
                                    value={embargoTerm}
                                    onChange={e => setEmbargoTerm(e.target.value)}
                                    placeholder="Embargo term"
                                />
                                <CreateMagazineFormField
                                    value={prefixDOI}
                                    onChange={e => setPrefixDOI(e.target.value)}
                                    placeholder="Префикс DOI"
                                />
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>

                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="Fivth slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormLabel>
                                    Сайт и прочее
                                </CreateMagazineFormLabel>
                                <CreateMagazineFormField
                                    value={webPage}
                                    onChange={e => setWebPage(e.target.value)}
                                    placeholder="Ссылка"
                                />
                                <CreateMagazineFormField
                                    value={accessTextArticles}
                                    onChange={e => setAccessTextArticles(e.target.value)}
                                    placeholder="Доступ к научным статьям"
                                />
                                <CreateMagazineFormField
                                    value={dataStartArchieve}
                                    onChange={e => setDataStartArchieve(e.target.value)}
                                    placeholder="Начала архивирования"
                                />
                                <CreateMagazineFormField
                                    value={dataEndArchieve}
                                    onChange={e => setDataEndArchieve(e.target.value)}
                                    placeholder="Конца архивирования"
                                />
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>

                        <CreateMagazineCarouselItem interval={100000}>
                            <CreateMagazineCarouselImage
                                src={back}
                                alt="Sixth slide"
                            />
                            <CreateMagazineCarouselCaption>
                                <CreateMagazineFormLabel>
                                    ELibrary информация
                                </CreateMagazineFormLabel>
                                <CreateMagazineFormField
                                    value={linkELibrary}
                                    onChange={e => setLinkELibrary(e.target.value)}
                                    placeholder="Ссылка"
                                />
                                <CreateMagazineFormField
                                    value={accessArticleELibrary}
                                    onChange={e => setAccessArticleELibrary(e.target.value)}
                                    placeholder="Доступ к статьм"
                                />    
                                <CreateMagazineFormField
                                    value={dataStartArchieveELibrary}
                                    onChange={e => setDataStartArchieveELibrary(e.target.value)}
                                    placeholder="Год начала архивирования"
                                />
                                <CreateMagazineFormField
                                    value={dataEndArchieveELibrary}
                                    onChange={e => setDataEndArchieveELibrary(e.target.value)}
                                    placeholder="Год конца архивирования"
                                />
                            </CreateMagazineCarouselCaption>
                        </CreateMagazineCarouselItem>
                    </CreateMagazineCarouselContainer>
                </CreateMagazineFormContainer>
            </CreateMagazineModalBody>
            <CreateMagazineModalFooter>
                <CreateMagazineModalButton variant="outline-dark" onClick={onHide}>
                    Закрыть
                </CreateMagazineModalButton>
                <CreateMagazineModalButton variant="outline-dark" onClick={addMagazine}>
                    Добавить
                </CreateMagazineModalButton>
            </CreateMagazineModalFooter>
        </CreateMagazineModalContainer>
    );
});

export default CreateMagazine;