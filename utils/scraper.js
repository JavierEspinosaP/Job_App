//Función para extraer ofertas

const extractOfferData = async (url, browser) => {
    try{
        //Creamos objeto vacío para almacenar las ofertas
        const offerData = {}
        //Abrimos pestaña
        const page = await browser.newPage();
        //Acceso a la url
        await page.goto(url);

        //Utilizamos método newPage.$eval(selector, function) y almacenamos en offerData:

        //Título oferta
        offerData['proyect_name'] = await page.$eval('.jobtitle', name=>name.innerText)
        //Empresa cliente
        offerData['company'] = await page.$eval('.job-card h3', company=>company.innerText)
        //Fecha publicación
        offerData['date'] = await page.$eval('.date-field p', date=>date.innerText)
        //Localización
        offerData['location'] = await page.$eval('.location-field p', location=>location.innerText)
        //Descripción
        offerData['description'] = await page.$eval('.job-card p', description=>description.innerText)

        return offerData //Devuelve los datos de una oferta
    }
    catch (err) {
        console.log("Error:", err);
    }
}