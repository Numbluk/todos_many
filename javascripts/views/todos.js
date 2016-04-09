var TodosView = Backbone.View.extend({
  el: $("ul#todos"),

  template: Handlebars.compile($("#todo_template").html()),

  events: {
    "click div.cross": "removeTodo",
    "click input[type='checkbox']": "toggleComplete"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.empty();
    var sorted_collection = _.sortBy(this.collection.toJSON(), function(todo) {
      return todo.completed;
    });
    this.$el.append(this.template({
      todo: sorted_collection
    }));
  },

  getTodoID: function(event) {
    return +$(event.target).closest("li").attr("data-id");
  },

  removeTodo: function(e) {
    this.trigger("remove_todo", { id: this.getTodoID(e) });
  },

  toggleComplete: function(e) {
    this.trigger("toggle_complete", { id: this.getTodoID(e) });
  }
});
