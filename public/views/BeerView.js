var BeerView = Backbone.View.extend({
  className: 'beer',

  template: Handlebars.compile($('#beer-template').html()),

  events: {
    'click .remove': 'removeBeer',
    'click .edit': 'toggleEditMode',
    'keypress .edit-mode': 'updateOnEnter',
    'blur .edit-mode': 'close'
  },

  initialize: function () {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change:edit_mode', this.renderEdit);
    this.listenTo(this.model, 'change:name', this.render);
    this.listenTo(appModel, 'change', this.toggleButtons);
  },

  toggleEditMode: function () {
      this.model.set('edit_mode', !this.model.get('edit_mode'));

      this.$nameInput.focus();
  },

  removeBeer: function () {
    if(appModel.get('current_user')){
      this.model.destroy({ success: function(model, response) {
        console.log(model);
        console.log(response);
      }});
    }
  },

  renderEdit: function () {
    this.$el.toggleClass('editing', this.model.get('edit_mode'));
  },

  // If you hit `enter`, we're through editing the item.
  updateOnEnter: function (e) {
    if (e.which === 13) {
      this.close();
    }
  },

  // Close the "editing" mode, saving changes to the beer.
  close: function () {
    var value = this.$nameInput.val();

    if (!this.model.get('edit_mode')) {
      return;
    }

    this.model.set('name', value);
    this.model.set('edit_mode', false);
    this.model.save();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$edit = this.$('.edit');
    this.$remove = this.$('.remove');

    this.$nameInput = this.$('.edit-mode');
    if(appModel.get('current_user') === null){
      this.$edit.removeClass('showa');
      this.$remove.removeClass('showa');
    }else{
      this.$edit.addClass('showa');
      this.$remove.addClass('showa');
    }
    return this;
  },

  toggleButtons: function () {

  }
})