//Importamos la función scraper de la carpeta utils
const scraper = require('../utils/scraper')

async function getOffers (req, res) {
    try {
        const offers = await scraper.scrap("https://www.workana.com/jobs?language=en%2Ces")
        // const offers2= await scraper.scrap2("https://es.indeed.com/m")
        res.status(200).json(offers)
    }
    catch (err) {
        res.status(404).json({})
    }
}

module.exports = {getOffers} 