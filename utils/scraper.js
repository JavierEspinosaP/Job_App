const puppeteer = require("puppeteer");

//Función para extraer los datos de una oferta concreta

let searchQuery = "javascript"

//Iniciar el scraping

const scrap = async (url) => {
    try {
        //Creamos objeto vacío para almacenar la info de la oferta

        let offerData = {} //Objeto de la oferta
        const scrapedData = [] //Array de los objetos de las ofertas

        //Inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser...");
        const browser = await puppeteer.launch({headless:false})

        //Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage();
        //Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url);
        console.log(`Navigating to ${url}...`);

        //Extraemos todos los links a los que navegaremos para obtener la información de cada proyecto

        //Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos

        /********** A RELLENAR page.$eval(selector, function)  *********/


        await page.waitForSelector('#Query', {visible: true}) // Esperamos a que aparezca el elemento
        await page.type('#Query', searchQuery) //Introducimos la petición en el buscador
        await page.waitForTimeout(3000)//Tiempo para que refresque la búsqueda

        //Arrays con los datos de las ofertas
        let arrNames = await page.$$eval('.h3 a span', res => res.map(name=>name.innerText))
        let arrPublished = await page.$$eval('.date', res => res.map(date=>date.innerText))
        let arrBudgets = await page.$$eval('.values', res => res.map(value=>value.innerText))
        let arrUrls = await page.$$eval('.h3 a', res => res.map(url=>url.href))

        console.log(arrNames);


        //Bucle para formar cada objeto con los datos de cada oferta
        for (let index = 0; index < arrNames.length; index++) {
            offerData = {}
            offerData['proyect-name'] = arrNames[index]
            offerData['published'] = arrPublished[index]
            offerData['budget'] = arrBudgets[index]
            offerData['url'] = arrUrls[index]
            scrapedData.push(offerData)
        }
        
        browser.close()
        return scrapedData
    }
    catch (err) {
        console.log("Error:", err);
    }
}

// const scrap2 = async (url) => {
//     try {
//         //Creamos objeto vacío para almacenar la info de la oferta

//         const offerData = {} //Objeto de la oferta
//         const scrapedData = [] //Array de los objetos de las ofertas

//         //Inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
//         console.log("Opening the browser...");
//         const browser = await puppeteer.launch({headless:false})

//         //Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
//         const page = await browser.newPage();
//         //Indicamos la url que debe cargarse en la pestaña con page.goto(url)
//         await page.goto(url);
//         console.log(`Navigating to ${url}...`);

//         //Extraemos todos los links a los que navegaremos para obtener la información de cada proyecto

//         //Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos

//         /********** A RELLENAR page.$eval(selector, function)  *********/


//         await page.waitForSelector('#keywords-input', {visible: true}) // Esperamos a que aparezca el elemento
//         await page.type('#keywords-input', searchQuery) //Introducimos la petición en el buscador
//         await page.waitForTimeout(1000)//Tiempo para que refresque la búsqueda

//         //Arrays con los datos de las ofertas
//         let arrNames = await page.$$eval('.job-title h2', res => res.map(title=>title.innerText))
//         let arrCompanies = await page.$$eval('.companyName', res => res.map(comp=>comp.innerText))
//         let arrDates = await page.$$eval('.date-field p', res => res.map(date=>date.innerText))
//         let arrLocations = await page.$$eval('.companyLocation', res => res.map(date=>date.innerText))
//         let arrUrls = await page.$$eval('.job-card-header a', res => res.map(url=>url.href))

//         //Bucle para formar cada objeto con los datos de cada oferta
//         for (let index = 0; index < arrNames.length; index++) {
//             offerData['proyect-name'] = arrNames[index]
//             offerData['company'] = arrCompanies[index]
//             offerData['date'] = arrDates[index]
//             offerData['location'] = arrLocations[index]
//             offerData['url'] = arrUrls[index]
//             scrapedData.push(offerData)
//         }
//         browser.close()
//         return scrapedData
//     }
//     catch (err) {
//         console.log("Error:", err);
//     }
// }

module.exports = {
    scrap
}
