const router = require('express').Router();
const commentRoutes = require('./comment-routes');
const pizzaRoutes = require('./pizza-routes');

// add /comments to routes from comment-routes
router.use('/comments', commentRoutes);
// add '/pizzas' to routes from pizza-routes
router.use('/pizzas', pizzaRoutes);

module.exports = router;