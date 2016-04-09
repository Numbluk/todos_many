var List = Backbone.Model.extend({
  defaults: function() {
    this.count = 0;
    this.todos = [];
    this.id = undefined;
  },

  initialize: function() {

  },

  add: function(content) {
    this.todos.unshift(new Todo({
      content: content.content,
      id: this.count
    }));
    this.count++;
  },

  toggleComplete: function(data) {
    var todo = this.todos.find(function(todo) {
      data = todo.id;
    });
    var current_state = todo.get("completed");
    todo.set("completed", !current_state);
  },

  clearFinished: function() {
    var list_model = this;
    list_model.todos.forEach(function(todo) {
      if ( todo.get("completed") === true ) {
        list_model.removeTodo(todo);
      }
    });
  },

  removeTodo: function(todo) {
    var todos = this.todos;
    var remove = todos.find(function(todo_in_arr, i) {
      if ( todo_in_arr.get("id") == todo.get("id") ) {
        return i;
      }
    });

    todos.splice(remove, 1);
  },

  completeAll: function() {
    var todos = this.todos;
    todos.forEach(function(todo) {
      todo.set("completed", true);
    });
  },
});
