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

  edit: function(id_and_content) {
    var id = id_and_content.todo_obj.id;
    var content = id_and_content.todo_obj.content;

    this.todos.forEach(function(todo) {
      if ( todo.id == id ) {
        todo.set("content", content);
      }
    });
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
