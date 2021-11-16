
//Importação
const Jimp = require('jimp')
const express = require('express')
const app = express()

const empresas = [
    { id: 1, nome: 'Empresa A', telefone: '1234' },
    { id: 2, nome: 'Empresa B', telefone: '4567' },
    { id: 3, nome: 'Empresa C', telefone: '7891' },
    { id: 4, nome: 'Empresa D', telefone: '2345' }
]

//Gerar uma imagem dinamica e fazer esse metodo com async
const genImage = async(text) => {

    const image = await new Jimp(200, 40)
    //const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
    image.print(font, 0,0, text)
    return image

    /*
    //Onde quero salvar essa imagem acima
    await image.write('teste.png')
    */

}

/*
//Vamos rodar os codigos acima
genImage()
*/

//As rotas, render
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index', { empresas }))
app.get('/image/:indice', async(req, res) => {

    const image = await genImage(empresas[ req.params.indice ].telefone)

    //Devolver essa imagem acima para o navegador
    image.getBuffer(Jimp.MIME_PNG, (err, data) => {

        //O tipo dessa imagem
        res.header('Content-typer', 'image/png')    
        //Enviar
        res.send(data)

    })
})

//Ligar server com express
app.listen(3000, () => console.log('Listening...'))