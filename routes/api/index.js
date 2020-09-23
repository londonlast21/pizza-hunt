const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

// add '/pizzas' to routes from pizza-routes
router.use('/pizzas', pizzaRoutes);

module.exports = router;