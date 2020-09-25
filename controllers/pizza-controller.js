const { Pizza } = require('../models');

const pizzaController = {
    // GET all pizza
    getAllPizza(req, res) {
        Pizza.find({})
            .populate({
                path: 'comments',
                select: '-_v'
            })
            .select('-_v')
            .sort({ _id: -1 })
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
         });
    },

    // GET single pizza w/ ID
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-_v'
        })
        .select('-_v')
        .then(dbPizzaData => {
            // if no pizza, send err
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // POST route to create pizzas
    createPizza({ body }, res) {
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // PUT route to update pizza at id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
    },

    // DELETE route to delete a pizza at ID
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this ID'});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;