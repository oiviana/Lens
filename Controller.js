const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./src/backend/models');
const req = require('express/lib/request');

const path = require('path')
const multer = require('multer')
const storage  = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,path.resolve(__dirname,'public','img'))
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage,fileFilter:(req,file,cb) =>{
    console.log("Mimetype",file.mimetype) 
    cb(null,true)

} })
// const uploadConfig = {

// }

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

const { Op } = require("sequelize");
//Models
let estudante = models.Estudante;
let enderecoestudante = models.Endereco_estudante;
let formacao = models.Formacao;
let instformacao = models.Instformacao;
let vaga = models.Vaga
let candidatura = models.Candidatura
let area = models.Area
let empresa = models.Empresa

app.post('/uploadImage',upload.single('avatar'), (req, res) =>{
    res.send("Passou pelo Upload")

});

//AREA

app.get('/readAreas/:id', (req, res) => {
    const id =req.params['id']
    area.findAll({
        where:{
            id: {
                [Op.not]: id
              }
        }
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

//AREA


//VAGAS

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

//VAGAS


//CANDIDATURAS

app.post('/createCandidatura', async (req, res) => {
    let createCandidatura = await candidatura.create({
        status: "Candidato",
        estudanteId: req.body.estudanteId,
        vagaId: req.body.vagaId,
        createAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Candidatura realizada')
});

app.get('/readCandidatura', (req, res) => {
    candidatura.findOne({
        where: { vagaId: 4},
        
        include: [{
            model: estudante,
            attributes: ['id', 'nome']
        },
        {
            model: vaga,
            attributes: ['id', 'titulo']
        }
    ]
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

app.get('/checkCandidatura/:estId&:vagaId', (req, res) => {
    const estId = req.params['estId']
    const vagId = req.params['vagaId']
    candidatura.findOne({
        where: { estudanteId:estId, vagaId:vagId }

    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});
//CANDIDATURAS



//ESTUDANTE

app.post('/createEstudante', async (req, res) => {
    let createEstudante = await estudante.create({
        nome: req.body.nome,
        sobrenome: '',
        email: req.body.email,
        senha: req.body.password,
        RG: req.body.rg,
        CPF: req.body.cpf,
        imagem:'http://localhost:3000/img/user.png',
        areaId:0,
        createAt: new Date(),
        updatedAt: new Date()
    });
    if (createEstudante != null) {
        res.send(createEstudante)
        console.log(createEstudante)
    } else {
        res.send("erro")
    }

});

app.get('/studentprofile/:id', (req, res) => {
    const id = req.params['id']
    estudante.findByPk(id,{
        include: [{
            model: area,
            attributes: ['nome_area','id']
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
// ESTUDANTE

// ENDEREÇO ESTUDANTE
app.get('/studentender/:id', (req, res) => {
    const id = req.params['id']
    enderecoestudante.findOne({
        where: { estudanteId: id}
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});


// ENDEREÇO ESTUDANTE

// FORMAÇÕES

app.get('/readFormacao/:id', (req, res) => {
    const id = req.params['id']
    formacao.findAll({
        where: { estudanteId: id}, 
        include: [{
            model: instformacao,
            attributes: ['id', 'nome','imagem']
        }
    ]
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});


// FORMAÇÕES

//EMPRESA
app.post('/logincompany', async (req, res) => {
    let response = await empresa.findOne({
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