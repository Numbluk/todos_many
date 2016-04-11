var ListView = Backbone.View.extend({
  el: $("ul#todos"),

  template: Handlebars.compile($("#todo_template").html()),

  events: {
    "click input[type='checkbox']": "toggleComplete",
    "click div.cross": "removeTodo"
  },

  reset: function() {
    this.$el.children().hide();
  },

  render: function(obj_as_id) {
    var view = this;
    view.$el.empty();

    view.collection.get(obj_as_id).todos.forEach(function(todo) {
      view.$el.append(view.template({
        todo: todo.toJSON()
      }));
    });
  },

  toggleComplete: function(e) {
    var todo_id = +$(e.target).closest("li").attr("data-id");
    var list_id = $(e.target).closest("ul").attr("data-title");
    this.trigger("toggle-complete", {
      todo_id: todo_id,
      list_id: list_id
    });
  },

  removeTodo: function(e) {
    var todo_id = +$(e.target).closest("li").attr("data-id");
    var list_id = $(e.target).closest("ul").attr("data-title");
    this.trigger("remove-todo", {
      todo_id: todo_id,
      list_id: list_id
    });
    this.render({ id: list_id });
  }
});
