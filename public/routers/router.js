var BeerRouter = Backbone.Router.extend({
  routes: {
    'beers/:id': 'showReviews',
    'register': 'renderRegister',
    'login': 'renderLogin',
    '*default': 'showBeers'
  },

  showReviews: function (id) {
    var allBeers = appModel.get('beers');

    var currentBeer = allBeers.findWhere({ _id: id });

    appModel.set('current_beer', currentBeer);
    appModel.set('view', 'reviews');
  },

  showBeers: function () {
    appModel.set('view', 'beers');
  },

  renderRegister: function () {
    appModel.set('view', 'register');
  },

  renderLogin: function () {
    appModel.set('view', 'login');
  }
});
