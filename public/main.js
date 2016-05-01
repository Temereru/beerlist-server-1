var appModel = new AppModel();

var appView = new AppView({ model: appModel });

var registerView = new RegisterView();
var loginView = new LoginView();

var beerRouter = new BeerRouter();

appModel.get('beers').fetch({success: function () {
  Backbone.history.start();
}}, {reset: true});
