const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer');

//! CONTROLAR LO QUE SE MUESTRA EN LA PÁGINA
//* SI SE ENCUENTRA EL CLIMA, SE MUESTRA LA PAGINA NORMAL
//* SI NO, SE MANDA A UNA PAGINA DE ERROR PARA BUSCAR DE NUEVO

async function mostrar(res, loc){
    //* Dependiendo de la URL se busca el lugar, si no se manda el parametro lugar, se busca solo clima
    let lugar = loc || "";

    let datosPagina;

    //! PUPETTEER
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    //* Entrar a la página para ver el clima
    await page.goto(`https://www.google.com/search?q=clima ${lugar}`);

    //* Obtener datos
    datosPagina = await page.evaluate(()=>{
        if(document.querySelector('.KIy09e.obcontainer.wDYxhc') == null){
            return false;
        }

        let img = document.querySelector('#wob_tci');
        let src = img.src;
        let alt = img.alt;

        let titulo = document.querySelector('#wob_loc').innerHTML;
        
        let temperatura = document.querySelector('#wob_tm').innerText;

        let probabilidadLluvia = document.querySelector('#wob_pp').innerText;
        
        let humedad = document.querySelector('#wob_hm').innerText;

        let viento = document.querySelector('#wob_ws').innerText;

        //* Retornar la información obtenida
        return {
            imgSrc: src,
            imgAlt: alt,
            titulo,
            temperatura,
            probabilidad: probabilidadLluvia,
            humedad,
            viento
        }
    })

    browser.close();

    //! RENDERS
    //* Si no se encontraron los datos, se manda a la página de error
    if(datosPagina != false){
        res.render('index.ejs', datosPagina);
    } else {
        res.render('error.ejs');
    }
}

//! RUTAS
router.get('/', (req, res) => {
    mostrar(res);
})

router.get('/loc=:lugar', (req, res) => {
    let lugar = req.params.lugar;

    mostrar(res, lugar);
})
 
module.exports = router;