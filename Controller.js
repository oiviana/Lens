const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const models = require('./src/backend/models');
const req = require('express/lib/request');

const path = require('path')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, 'public', 'img'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage, fileFilter: (req, file, cb) => {
        console.log("Mimetype", file.mimetype)
        cb(null, true)

    }
})
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
let enderecoempresa = models.Endereco_empresa;
let formacao = models.Formacao;
let instformacao = models.Instformacao;
let vaga = models.Vaga
let candidatura = models.Candidatura
let area = models.Area
let empresa = models.Empresa

app.patch('/uploadImage', upload.single('avatar'), (req, res) => {
    res.send("Passou pelo Upload")

});

//AREA

app.get('/readAreas/:id', (req, res) => {
    const id = req.params['id']
    area.findAll({
        where: {
            id: {
                [Op.not]: id
            }
        }
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

//AREA

//INSTITUIÇÃO

app.get('/readInstitutions/', (req, res) => {
    const id = req.params['id']
    instformacao.findAll({}).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

//INSTITUIÇÃO

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

//Select Vagas por empresa
app.get('/readVagasbycompany/:id', (req, res) => {
    const id = req.params['id']
    vaga.findAll({
        where: {
            empresaId: id
        }
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

app.post('/createVaga', async (req, res) => {
    await vaga.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
        periodo: req.body.periodo,
        status: req.body.status,
        empresaId: req.body.empresaId,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(response => res.send(response))
        .catch((error) => {
            console.log(error)
            res.send("erro")
        })

});

app.patch('/updateVaga/:id', async (req, res) => {
    const id = req.params['id'];
    let updateVaga = await vaga.findByPk(id).then((response) => {

        response.titulo = req.body.titulo;
        response.descricao = req.body.descricao;
        response.periodo = req.body.periodo;
        response.status = req.body.status
        response.save();
        console.log("response", response)
    }).catch(error => console.log(error))
    res.send(updateVaga)
});


//VAGAS


//CANDIDATURAS

app.post('/createCandidatura', async (req, res) => {
    let createCandidatura = await candidatura.create({
        status: "Candidato",
        estudanteId: req.body.estudanteId,
        vagaId: req.body.vagaId,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    res.send('Candidatura realizada')
});

app.get('/readCandidatura', (req, res) => {
    candidatura.findOne({
        where: { vagaId: 4 },

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
});app.get('/readCandidaturas/:vagaId', (req, res) => {
    const vagId = req.params['vagaId']
    candidatura.findAll({
        where: { vagaId: vagId },

        include: [{
            model: estudante,
            attributes: ['id', 'nome','imagem']
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
        where: { estudanteId: estId, vagaId: vagId }

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
        imagem: 'http://localhost:3000/img/user.png',
        areaId: 0,
        createdAt: new Date(),
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
    estudante.findByPk(id, {
        include: [{
            model: area,
            attributes: ['nome_area', 'id']
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
    }
});

app.patch('/updateStudent/:id', async (req, res) => {
    const id = req.params['id'];
    let updateStudent = await estudante.findByPk(id).then((response) => {

        response.nome = req.body.nome;
        response.sobre = req.body.description;
        response.areaId = req.body.area
        response.save();
        console.log("response", response)
    }).catch(error => console.log(error))
    res.send(updateStudent)
});

// ESTUDANTE


// ENDEREÇO ESTUDANTE
app.get('/studentender/:id', (req, res) => {
    const id = req.params['id']
    enderecoestudante.findOne({
        where: { estudanteId: id }
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

app.put('/updatestudentender/:id', async (req, res) => {
    const id = req.params['id']

    let updateCompanyEnder = await enderecoestudante.findOne({
        where: { estudanteId: id }
    })
    if (updateCompanyEnder === null) {
        await enderecoestudante.create({
            CEP: req.body.cep,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            bairro: req.body.bairro,
            UF: req.body.uf,
            cidade: req.body.cidade,
            estudanteId: id,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.send("Endereço Criado")
    } else {
        updateCompanyEnder.CEP = req.body.cep;
        updateCompanyEnder.logradouro = req.body.logradouro;
        updateCompanyEnder.numero = req.body.numero;
        updateCompanyEnder.bairro = req.body.bairro;
        updateCompanyEnder.UF = req.body.uf;
        updateCompanyEnder.cidade = req.body.cidade;
        updateCompanyEnder.save();
        res.send(updateCompanyEnder)
    }

});

// ENDEREÇO ESTUDANTE


// ENDEREÇO EMPRESA
app.get('/companyender/:id', (req, res) => {
    const id = req.params['id']
    enderecoempresa.findOne({
        where: { empresaId: id }
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

app.post('/updatecompanyender/:id', async (req, res) => {
    const id = req.params['id']

    let updateCompanyEnder = await enderecoempresa.findOne({
        where: { empresaId: id }
    })
    if (updateCompanyEnder === null) {
        await enderecoempresa.create({
            CEP: req.body.cep,
            logradouro: req.body.logradouro,
            numero: req.body.numero,
            bairro: req.body.bairro,
            UF: req.body.uf,
            cidade: req.body.cidade,
            empresaId: id,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        res.send("Endereço Criado")
    } else {
        updateCompanyEnder.CEP = req.body.cep;
        updateCompanyEnder.logradouro = req.body.logradouro;
        updateCompanyEnder.numero = req.body.numero;
        updateCompanyEnder.bairro = req.body.bairro;
        updateCompanyEnder.UF = req.body.uf;
        updateCompanyEnder.cidade = req.body.cidade;

        updateCompanyEnder.save();
        res.send(updateCompanyEnder)
    }



});


// ENDEREÇO EMPRESA

// FORMAÇÕES

app.post('/createFormation', async (req, res) => {
    await formacao.create({
        curso: req.body.curso,
        data_inicio: req.body.data_inicio,
        data_termino: req.body.data_termino,
        periodo: req.body.periodo,
        estudanteId: req.body.estudanteId,
        instformacaoId: req.body.instformacaoId,
        createdAt: new Date(),
        updatedAt: new Date()
    }).then(response => res.send(response))
        .catch((error) => {
            console.log(error)
            res.send("erro")
        })

});

app.get('/readFormacao/:id', (req, res) => {
    const id = req.params['id']
    formacao.findAll({
        where: { estudanteId: id },
        order: [
            ['data_termino', 'DESC']
        ],
        include: [{
            model: instformacao,
            attributes: ['id', 'nome', 'imagem']
        }
        ]
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});

app.get('/currentFormacao/:id', (req, res) => {
    const id = req.params['id']
    formacao.findOne({
        where: { estudanteId: id },
        order: [
            ['data_termino', 'DESC']
        ],
        include: [{
            model: instformacao,
            attributes: ['nome']
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
        // console.log(response)
    }
});

app.get('/companyprofile/:id', (req, res) => {
    const id = req.params['id']
    empresa.findByPk(id, {
        include: [{
            model: area,
            attributes: ['nome_area', 'id']
        }]
    }).then(teste => res.send(teste))
        .catch(error => console.log(error))
});
app.patch('/updateCompany/:id', async (req, res) => {
    const id = req.params['id'];
    let updateCompany = await empresa.findByPk(id).then((response) => {

        response.nome = req.body.nome;
        response.sobre = req.body.description;
        response.areaId = req.body.area;
        response.atuacao = req.body.atuacao;
        response.site = req.body.site
        response.save();
        console.log("response", response)
    }).catch(error => console.log(error))
    res.send(updateCompany)
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


let port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log("SERVER RODANDO")
});