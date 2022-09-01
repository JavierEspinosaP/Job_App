const puppeteer = require("puppeteer");

//Función para extraer los datos de una oferta concreta

const extractOfferData = async (url, browser) => {
    try{
        //Creamos objeto vacío para almacenar la info de la oferta
        const offerData = {}
        //Abrimos pestaña
        const page = await browser.newPage();
        //Acceso a la url
        await page.goto(url);

        //Utilizamos método newPage.$eval(selector, function) y almacenamos en offerData:

        //Título oferta
        offerData['proyect_name'] = await page.$eval('#job-title', name=>name.innerText)
        //Empresa cliente
        offerData['company'] = await page.$eval('.job-offer-logo-image', company=>company.title)
        //Localización
        if(await page.$('#job-location0 a')){
        offerData['location'] = await page.$eval('#job-location0 a', location=>location.innerText)    
        }
        // offerData['location'] = "No especificada"
        //Descripción, es un div con muchos p's, probar si coge solo el texto de cada uno, si no, coger el innerHTML y utilizar un template string
        offerData['description'] = await page.$eval('.h2_desc', description=>description.innerHTML)



        return offerData //Devuelve los datos de una oferta
    }
    catch (err) {
        //Si hay error, se devuelve por consola
        console.log("Error:", err);
    }
}

//Iniciar el scraping

const scrap = async (url) => {
    try {
        // Creamos un array vacío scrapedData donde almacenamos la información obtenida del scraping
        const scrapedData = []
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

        //[] de URL's
        const tmpurls = await page.$$eval('.job-card-wrapper a', res => res.map(a=>a.href))


        //Quitamos los duplicados
        
        const urls = tmpurls.filter(element => {
            if (element.includes("https://ticjob.es/esp/busqueda/trabajo/")) {
             return element;   
            }
          });

        console.log("url capuradas",urls)
        //Se podria seleccionar el número de urls, en este caso no hace falta, lo dejo comentado
        //const urls2 = urls.slice(0, 21);

        console.log(`${urls.length} links encontrados`);

        // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractOfferData por cada link en el array.
        // Luego pusheamos el resultado a scraped data
        for(offerLink in urls){
            const offer = await extractOfferData(urls[offerLink], browser)
            scrapedData.push(offer)
        }

        console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length);

        //cerramos browser con browser.close
        // await browser.close()
        //Devolvemos el array con las ofertas
        return scrapedData
    }
    catch (err) {
        console.log("Error:", err);
    }
}

exports.scrap = scrap;