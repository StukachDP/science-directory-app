import { $authHost, $host } from "./index";


// В данном файле определено взаимодействие запросов из фронт-енд приложения к серверу.
// При определенных запросах с клиента, которые здесь определены как функции. 
// Вызывается функция с серверной части приложения.
// Здесь описано взаимодействие только по функциям, связанных с информацией о научных журналах.
// Некоторые функции могут вызываться только администратором, что описано с использованием хостинга.

export const getMagazines = async() => {
    const responseData = await $host.get('/getMagazines');
    return responseData;
}

export const getMagazineInfo = async(id) => {
    const responseData = await $host.get('/getMagazineInfo/' + id);
    return responseData;
}

export const getMagazinesByTitle = async(searchingData) => {
    const responseData = await $host.get('/searchByTitle', {params:{ searchingData }});
    return responseData;
}

export const getMagazinesByScientificDirections = async(choosenDirection) => {
    const responseData = await $host.get('/searchByScientificDirections',{params:{choosenDirection}});
    return responseData;
}

export const createMagazine = async(nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) => {
    const responseData = await $authHost.post('/createMagazine', {nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience });
    return responseData;
}

export const editMagazineInfo = async(id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience) => {
    const responseData = await $authHost.post('/editMagazineInfo', { id, nameOriginal, nameRus, nameEng, ISSNprint, ISSNonline, publisher, publisherEng, scientificDirections, webPage, accessTextArticles, dataStartArchieve, dataEndArchieve, embargoTerm, prefixDOI, includedRSCI, linkELibrary, accessArticleELibrary, dataStartArchieveELibrary, dataEndArchieveELibrary, bibliometricIndicatorsRSCI, yearsIndexingScopus, yearsIndexingWebOfScience });
    return responseData;
}

export const deleteMagazineInfo = async(id) => {
    const responseData = await $authHost.post('/deleteMagazineInfo/' + id);
    return responseData;
}