var RegisterView = Backbone.View.extend({
  el: $('.register-container'),

  events: {
    'click .register': 'register'
  },

  register: function (e) {
    e.preventDefault();

    var user = new UserModel({
      username: this.$('#register-username').val(),
      password: this.$('#register-password').val()
    });

    user.save({}, {
      success: function (user) {
        console.log(user.get('username') + ' is successfully registered');
        // var currentUser = new UserModel(user)
        appModel.set('current_user', user);
        beerRouter.navigate('/', true);
      },
      error: function (user, response) {
        console.log(user);
        console.log(response);
      }
    });
  }
});
