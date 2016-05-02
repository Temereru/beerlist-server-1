var ReviewView = Backbone.View.extend({
  className: 'review',

  template: Handlebars.compile($('#review-template').html()),

  events: {
    'click .remove': 'removeReview',
  },

  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove);
  },

  removeReview: function () {
    if(appModel.get('current_user')){
      this.model.destroy({success: function(model, response) {
        console.log(model);
        console.log(response);
      }});
    } 
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$reviewForm = this.$('.review-form');
    if(appModel.get('current_user') === null){
      this.$reviewForm.removeClass('showa');
    }else{
      this.$reviewForm.addClass('showa');
    }
    return this;
  }
})