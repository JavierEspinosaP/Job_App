//Importamos la función scraper de la carpeta utils
const scraper = require('../utils/scraper')

async function getOffers (req, res) {
    try {
        const offers = await scraper.scrap("https://ticjob.es/esp/freelances-it")
        res.status(200).json(offers)
    }
    catch (err) {
        res.status(404).json({})
    }
}

module.exports = {getOffers} 