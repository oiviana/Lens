const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./src/backend/models');
let estudante = models.Estudante;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Models
let vaga = models.Vaga
let area = models.Area
let empresa = models.Empresa

//Select Vagas
app.get('/readVagas', (req, res) => {
    vaga.findAll({
        include: [{
            model: empresa,
            attributes: ['id', 'nome', 'sobre', 'imagem']
        }]

    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

//Select vaga by id
app.get('/aboutVaga/:id', (req, res) => {
    const id = req.params['id']
    vaga.findByPk(id, {
        include: [{
            model: empresa,
            attributes: ['id', 'nome', 'sobre', 'imagem']
        }]

    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});



//Login Estudante
app.post('/login', async (req, res) => {
    let response = await estudante.findOne({
        where: { email: req.body.email, senha: req.body.password }
    });
    if (response === null) {
        res.send(JSON.stringify('Credenciais incorretas'))
    } else {
        res.send(response);
        console.log(response)
    }
});



// app.get('/createArea', async (req, res) =>{
//     let createArea = await area.create({
//         nome_area: "Direito",
//         createAt: new Date(),
//         updatedAt: new Date()
//     });
//     res.send('Área catalogada com sucesso')
// });

// app.get('/readArea', async (req, res) =>{
//     let readArea = await area.findAll()
//     res.send(readArea)
//     });

// app.get('/updateArea', async (req, res) =>{
//     let updateArea = await area.findByPk(4).then((response)=>{
//         response.nome_area = 'direitinho';
//         response.save();
//     })
//     res.send(updateArea)
//     });    



let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("SERVER RODANDO")
});