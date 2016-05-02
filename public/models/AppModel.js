var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      beers: new BeersCollection(),

      current_beer: null,

      // set a view to whatever view used
      view: 'beers',

      current_user: null
    }
  },

  url: '/currentUser',

  parse: function (response) {
    if (response) {
      var user = new UserModel(response);
      this.set('current_user', user);
    }
  },

  initialize: function () {
    this.on('change:current_beer', this._setReviewsUrl);
  },

  _setReviewsUrl: function () {
    var beer = this.get('current_beer');
    var id = beer.get('_id');

    beer.get('reviews').url = '/beers/' + id + '/reviews';
  }
});
