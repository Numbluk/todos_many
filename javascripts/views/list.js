var ListView = Backbone.View.extend({
  el: $("ul#todos"),

  template: Handlebars.compile($("#todo_template").html()),

  events: {
    "click input[type='checkbox']": "toggleComplete",
    "click div.cross": "removeTodo",
    "dblclick li p": "editTodo",
    "keypress input#edit_todo": "submitEdit"
  },

  reset: function() {
    this.$el.children().hide();
  },

  render: function(obj_as_id) {
    var view = this;
    view.$el.empty();
    var curr_list = view.collection.get(obj_as_id);

    curr_list.todos.forEach(function(todo) {
      view.$el.append(view.template({
        todo: todo.toJSON()
      }));
    });
    view.$el.attr("data-title", obj_as_id.id);
    $("h1").text(curr_list.id);
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
  },

  editTodo: function(e) {
    var li_todo = $(e.target).closest("li");
    li_todo.html("<input type='text' id='edit_todo' minlength='1'>");
    li_todo.find("input").focus();
    // fix for empty
  },

  submitEdit: function(e) {
    if ( e.which === 13) {
      var input = $(e.target).val();
      if ( input == false ) {
        $(e.target).attr("placeholder", "Can't be empty");
        $(e.target).focus();
        return;
      }
      var curr_list = $(e.target).closest("ul").attr("data-title");
      this.trigger("edit-todo", {
        list_id: curr_list,
        todo_obj: {
          id: +$(e.target).closest("li").attr("data-id"),
          content: input
        }
      });

      this.render({ id: curr_list });
    }
  }
});
