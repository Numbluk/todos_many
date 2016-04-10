var ListView = Backbone.View.extend({
  el: $("ul#todos"),

  template: Handlebars.compile($("#todo_template").html()),

  reset: function() {
    this.$el.children().hide();
  },

  render: function(obj_as_id) {
    var view = this;
    view.collection.get(obj_as_id).todos.forEach(function(todo) {
      view.$el.prepend(view.template({
        todo: todo.toJSON()
      }));
    });
  }
});
