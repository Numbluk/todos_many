var Todos = Backbone.Collection.extend({
  model: List,

  completeList: function(id_as_obj) {
    this.get(id_as_obj).completeAll();
  },

  clearFinished: function(id_as_obj) {
    this.get(id_as_obj).clearFinished();
  },

  toggleComplete: function(todo_and_list_id) {
    this.get(todo_and_list_id.list_id).toggleComplete(todo_and_list_id.todo_id);
  },

  removeTodo: function(todo_and_list_id) {
    this.get(todo_and_list_id.list_id).removeTodo(todo_and_list_id.todo_id);
  },

  getTotalTodosUnfinished: function() {
    var total_unfinished = 0;
    this.each(function(list) {
      total_unfinished += list.getTodosUnfinished();
    });
    return total_unfinished;
  }
});
