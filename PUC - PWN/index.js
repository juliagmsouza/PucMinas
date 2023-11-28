const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = process.env.Port || 5000

const listaProdutos = {
    produtos: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

app.get('/produtos', (req, res) => {
  res.json(listaProdutos).status(200)
})

app.post('/produtos', bodyParser.json(), (req, res) => {
    const ultimoId = listaProdutos.produtos[listaProdutos.produtos.length - 1].id
    const produto = {
        id: ultimoId + 1,
        descricao: req.body.descricao,
        valor: req.body.valor,
        marca: req.body.marca,
    }
    listaProdutos.produtos.push(produto)
    res.json({id: produto.id}).status(201)
})

app.get('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    const produto = listaProdutos.produtos.find(a => a.id === id)
    if(produto) {
        res.json(produto).status(200)
    } else {
        res.sendStatus(404)
    }
})

app.put('/produtos/:id', bodyParser.json(), (req, res) => {
    const id = Number(req.params.id)
    const indexProduto = listaProdutos.produtos.findIndex(a => a.id === id)
    if(indexProduto === -1) {
        res.sendStatus(404)
    } else {
         listaProdutos.produtos[indexProduto] = {
            id,
            descricao: req.body.descricao,
            valor: req.body.valor,
            marca: req.body.marca,
        }
        res.sendStatus(200)
    }
})

app.delete('/produtos/:id', (req, res) => {
    const id = Number(req.params.id)
    listaProdutos.produtos = listaProdutos.produtos.filter(produto => produto.id !== id)
    res.sendStatus(200)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

