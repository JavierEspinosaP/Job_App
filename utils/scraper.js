const puppeteer = require("puppeteer");


let searchQuery = "javascript"

//Iniciar el scraping

const arrScrapers = [ scrap = async (url, inputQuery) => {
    try {
        //Creamos objeto vacío para almacenar la info de la oferta
        

        let offerData = {} //Objeto de la oferta
        const scrapedData = [] //Array de los objetos de las ofertas

        //Inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser...");
        const browser = await puppeteer.launch({headless:true, args: ['--no-sandbox'] })

        //Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page = await browser.newPage();
        //Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page.goto(url);
        console.log(`Navigating to ${url}...`);

        //Extraemos todos los links a los que navegaremos para obtener la información de cada proyecto

        //Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos

        /********** A RELLENAR page.$eval(selector, function)  *********/


        await page.waitForSelector('#Query', {visible: true}) // Esperamos a que aparezca el elemento
        await page.type('#Query', inputQuery) //Introducimos la petición en el buscador
        await page.waitForTimeout(3000)//Tiempo para que refresque la búsqueda

        //Arrays con los datos de las ofertas
        let arrNames = await page.$$eval('.h3 a span', res => res.map(name=>name.innerText))
        let arrPublished = await page.$$eval('.date', res => res.map(date=>date.innerText))
        let arrBudgets = await page.$$eval('.values', res => res.map(value=>value.innerText))
        let arrDescript = await page.$$eval('.js-expander-passed', res => res.map(desc=>desc.innerText))
        let arrUrls = await page.$$eval('.h3 a', res => res.map(url=>url.href))
        let arrDescriptions = []
        
        for (let i = 0; i < arrDescript.length; i++) {
            let push = arrDescript[i].slice(0,200) + "..."
            let clean = push.replace(/\n/g, ' ')
            arrDescriptions.push(clean)
        }



        //Bucle para formar cada objeto con los datos de cada oferta
        for (let index = 0; index < arrNames.length; index++) {
            offerData = {}
            offerData['proyect_name'] = arrNames[index]
            offerData['published'] = arrPublished[index]
            offerData['budget'] = arrBudgets[index]
            offerData['description'] = arrDescriptions[index]
            offerData['url'] = arrUrls[index]
            scrapedData.push(offerData)
        }
        
        browser.close()

       

        return scrapedData
    }
    catch (err) {
        console.log("Error:", err);
    }
},

scrap2 = async (url2, inputQuery) => {
    try {
        //Creamos objeto vacío para almacenar la info de la oferta

        let offerData = {} //Objeto de la oferta
        const scrapedData = [] //Array de los objetos de las ofertas

        //Inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
        console.log("Opening the browser...");
        const browser2 = await puppeteer.launch({headless:true, args: ['--no-sandbox'] })

        //Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
        const page2 = await browser2.newPage();
        //Indicamos la url que debe cargarse en la pestaña con page.goto(url)
        await page2.goto(url2);
        console.log(`Navigating to ${url2}...`);

        //Extraemos todos los links a los que navegaremos para obtener la información de cada proyecto

        //Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos

        /********** A RELLENAR page.$eval(selector, function)  *********/
        let arrBudgetsClean = []

        await page2.waitForSelector('#keyword-input', {visible: true}) // Esperamos a que aparezca el elemento
        await page2.type('#keyword-input', inputQuery) //Introducimos la petición en el buscador
        //Tiempo para que refresque la búsqueda
        await page2.waitForTimeout(3000)
        //Arrays con los datos de las ofertas
        let arrNames2 = await page2.$$eval('.JobSearchCard-primary-heading-link', res => res.map(name=>name.innerText))
        let arrPublished2 = await page2.$$eval('.JobSearchCard-primary-heading-days', res => res.map(date=>date.innerText))
        let arrBudgets2 = await page2.$$eval('.JobSearchCard-primary-price', res => res.map(value=>value.innerText))
        let arrDesc = await page2.$$eval('.JobSearchCard-primary-description', res => res.map(desc=>desc.innerText))
        let arrUrls2 = await page2.$$eval('.JobSearchCard-primary-heading-link', res => res.map(url=>url.href))
        let arrDescriptions = []

        for (let i = 0; i < arrBudgets2.length; i++) {
            let clean = arrBudgets2[i].replace(/\n/g, ' ')
            arrBudgetsClean.push(clean)
        }

        for (let i = 0; i < arrDesc.length; i++) {
            let push = arrDesc[i].slice(0, 200) + "..."
            arrDescriptions.push(push)
        }


        //Bucle para formar cada objeto con los datos de cada oferta
        for (let index = 0; index < arrNames2.length; index++) {
            offerData = {}
            offerData['proyect_name'] = arrNames2[index]
            offerData['published'] = arrPublished2[index]
            offerData['budget'] = arrBudgetsClean[index]
            offerData['description'] = arrDescriptions[index]
            offerData['url'] = arrUrls2[index]
            scrapedData.push(offerData)
        }
        
        browser2.close()
        return scrapedData
    }
    catch (err) {
        console.log("Error:", err);
    }
}
]




module.exports = {
    arrScrapers
}
