var BeerDetailView = Backbone.View.extend({
  tagName: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),

  events: {
    'click .submit-review': 'createReview'
  },

  initialize: function () {
    this.listenTo(this.model.get('reviews'), 'add', this.addReview);
    this.listenTo(this.model.get('reviews'), 'reset', function() {
      this.renderReviews();
      this.render();
    });
  },

  createReview: function () {
      this.model.get('reviews').create({
        name: appModel.get('current_user').get('username'),
        text: this.$notesInput.val(),
      }, {wait: true});
  },

  addReview: function (review) {
    var reviewView = new ReviewView({ model: review });
    this.$reviewList.append(reviewView.render().el);
  },

  renderReviews: function () {
    this.model.get('reviews').each(function (m) {
      this.addReview(m);
    }, this);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));

    this.$nameInput = this.$('#review-name-input');
    this.$notesInput = this.$('#review-notes-input');

    this.$reviewList = this.$('.reviews-list');
    this.$remove = this.$('.remove');

    this.renderReviews();
    if(appModel.get('current_user') === null){
      this.$remove.removeClass('showa');
    }else{
      this.$remove.addClass('showa');
    }
    return this;
  }
});