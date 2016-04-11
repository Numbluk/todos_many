var List = Backbone.Model.extend({
  defaults: function() {
    this.count = 0;
    this.todos = [];
    this.id = undefined;
  },

  add: function(content) {
    this.todos.unshift(new Todo({
      content: content.content,
      id: this.count
    }));
    this.count++;
  },

  toggleComplete: function(id) {
    var todo = this.todos.find(function(todo) {
      return todo.id == id;
    });
    var current_state = todo.get("completed");
    todo.set("completed", !current_state);
  },

  clearFinished: function() {
    var list_model = this;
    list_model.todos.forEach(function(todo) {
      if ( todo.get("completed") === true ) {
        list_model.removeTodo(todo.get("id"));
      }
    });
  },

  removeTodo: function(todo_id) {
    this.todos = this.todos.filter(function(todo_in_arr, i) {
      return todo_in_arr.get("id") !== todo_id;
    });
  },

  completeAll: function() {
    var todos = this.todos;
    todos.forEach(function(todo) {
      todo.set("completed", true);
    });
  },

  getTodosUnfinished: function() {
    var total_unfinished = 0;

    this.todos.forEach(function(todo) {
      if ( todo.get("completed") === false ) {
        total_unfinished += 1;
      }
    });

    return total_unfinished;
  },

  areAllCompleted: function() {
    var state = false;
    for( var i = 0; i < this.todos.length; i++ ) {
      if ( !this.todos[i].get("completed")) {
        return false;
      }
    }

    return true;
  }
});
