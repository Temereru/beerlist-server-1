var AppView = Backbone.View.extend({
  el: $('body'),

  events: {
    'click .submit-beer': 'createBeer',
    'click #out': 'logout'
  },

  initialize: function () {
    this.$nameInput = this.$('#name-input');
    this.$styleInput = this.$('#style-input');
    this.$abvInput = this.$('#abv-input');
    this.$imgUrl = this.$('#img-input');

    this.$beerList = this.$('.beer-list');

    this.$beersContainer = this.$('.beers-container');
    this.$reviewsContainer = this.$('.reviews-container');
    this.$registerContainer = this.$('.register-container');
    this.$loginContainer = this.$('.login-container');
    this.$logoutView = this.$('.logout-view');

    this.listenTo(this.model.get('beers'), 'add', this.addBeer);
    this.listenTo(this.model.get('beers'), 'reset', this.renderBeers);

    this.listenTo(this.model, 'change:view', this.renderView);
    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);

    this.detailView = null;
  },

  renderView: function () {
    var view = this.model.get('view');

    if(this.model.get('current_user') === null){
      $('#reg').addClass('showa');
      $('#log').addClass('showa');
      $('#out').removeClass('showa');
      $('.navbar-brand').html('');
    }else{
      $('#reg').removeClass('showa');
      $('#log').removeClass('showa');
      $('#out').addClass('showa');
      console.log(this.model.get('current_user').get('username'))
      $('.navbar-brand').html(this.model.get('current_user').get('username'));
      
    }

    var viewMap = {
      'beers': this.$beersContainer,
      'reviews': this.$reviewsContainer,
      'register': this.$registerContainer,
      'login': this.$loginContainer,
      'logout': this.$logoutView
    }

    // if it's not working, can be change to each bult-in func
    this.$('.show').removeClass('show');
    viewMap[view].addClass('show');
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({ model: this.model.get('current_beer')});

    this.$reviewsContainer.append(this.detailView.render().el);
  },

  createBeer: function () {
    this.model.get('beers').create({
      name: this.$nameInput.val(),
      style: this.$styleInput.val(),
      abv: this.$abvInput.val(),
      image_url: this.$imgUrl.val()
    }, {wait: true});
  },

  addBeer: function (beer) {
    var beerView = new BeerView({ model: beer });
    this.$beerList.append(beerView.render().el);
  },

  renderBeers: function () {
    this.model.get('beers').each(function (m) {
      this.addBeer(m);
    }, this);
  },

  logout: function (){
    $.ajax({
    method: "GET",
    url: '/logout',
    success: function(data) {
      appModel.set('current_user', null);
      appModel.set('view', 'beers');
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
  }
});
