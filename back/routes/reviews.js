const express = require("express");
const Router = express.Router();
const Review = require("../models/Reviews");

Router.post('/', (req, res) => {
    Review.create({
        valoracion: req.body.valoracion,
        comentario: req.body.comentario,
        usuarioCreador: req.body.username
    })
        .then(review => {
            console.log("LLEGO LA REVIEW?!?!?!?", review)
            let user = review.setUser(req.body.userId)
            let product = review.setProduct(req.body.productId)
            Promise.all([user, product])
                .then(finalReview => res.json(finalReview))
        })
})

Router.get('/:productId/singleReview/', (req, res) => {
    Review.findAll({
        where: {
            productId: req.params.productId
        }
    })
    .then(reviews => res.json(reviews))
})

module.exports = Router;