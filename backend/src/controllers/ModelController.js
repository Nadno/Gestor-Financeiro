const mongoose = require('mongoose');
const Model = mongoose.model('Model');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const expenses = await Model.paginate({ }, { page, limit: 20 });

        return response.json(expenses);
    },

    async show(request, response) {
        const expense = await Model.findById(request.params.id);

        return response.json(expense);
    },

    async store(request, response) {
        const expense = await Model.create(request.body);

        return response.json(expense);
    },

    async update(request, response) {
        const expense = await Model.findByIdAndUpdate(request.params.id, request.body, { new: true });

        return response.json(expense);
    },

    async destroy(request, response) {
        await Model.findByIdAndRemove(request.params.id);

        return response.send();
    },
};