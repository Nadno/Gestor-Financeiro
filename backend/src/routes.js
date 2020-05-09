const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = express.Router();

const Model = require('./controllers/ModelController');

routes.get('/Model', Model.index);

routes.get('/Model/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), Model.show);

routes.post('/Model', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().equal('Receita', 'Mensal', 'Variável', 'Fixo'),
        amount: Joi.number().required(),
    })
}),Model.store);

routes.put('/Model/:id', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().equal('Receita', 'Mensal', 'Variável', 'Fixo'),
        amount: Joi.number().required(),
    })
}), Model.update);

routes.delete('/Model/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required(),
    })
}),Model.destroy);

module.exports = routes;