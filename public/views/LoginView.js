var LoginView = Backbone.View.extend({
  el: $('.login-container'),

  events: {
    'click .login': 'login'
  },

  login: function (e) {
    e.preventDefault();

    var user = new UserModel({
      username: this.$('#login-username').val(),
      password: this.$('#login-password').val()
    });

    user.url = '/login';
    
    user.save({}, {
      success: function (user) {
        console.log(user.get('username') + ' is successfully logged in');
        appModel.set('current_user', user);
        beerRouter.navigate('/', true);
      },
      error: function (user, response) {
        console.log(user);
        console.log(response);
      }
    }, {wait: true});   
  }
});
