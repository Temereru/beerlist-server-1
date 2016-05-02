var appModel = new AppModel();
appModel.fetch({wait: true});
var appView = new AppView({ model: appModel });
var registerView = new RegisterView();
var loginView = new LoginView();
var beerRouter = new BeerRouter();



appModel.get('beers').fetch({success: function () {
  Backbone.history.start();
}}, {reset: true});
