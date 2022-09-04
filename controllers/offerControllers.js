//Importamos la función scraper de la carpeta utils
const scraper = require('../utils/scraper')

async function getOffers (req, res) {
    try {
        // const offers1 = await scraper.scrap("https://www.workana.com/jobs?language=en%2Ces")
        const offers2= await scraper.scrap2("https://www.freelancer.com/jobs/web-development/")
        console.log(offers2);
        res.status(200).json(offers2)
    }
    catch (err) {
        res.status(404).json({})
    }
}

// async function getOffers2 (req, res) {
//     try {
//         const offers1 = await scraper.scrap("https://www.workana.com/jobs?language=en%2Ces")

//         res.status(200).json(offers1)
//     }
//     catch (err) {
//         res.status(404).json({})
//     }
// }

module.exports = {
    getOffers,
    // getOffers2
} 

///ITERAR LAS URLS EN EL SCRAPER PARA COGER AMBAS WEBS --> https://stackoverflow.com/questions/63580250/scrape-multiple-websites-using-puppeteer