// var app = {
//   init: function() {
//     this.data = new Input();
//     this.todos = new Todos();
//     this.todos_view = new TodosView({ collection: this.todos });
//
//     this.dispatcher = _.extend({}, Backbone.Events);
//
//     // Handle adding a todo
//     this.dispatcher.listenTo(this.data, "add_todo", this.addTodo.bind(this));
//     // Handle removing a todo
//     this.dispatcher.listenTo(this.todos_view, "remove_todo", this.todos.remove.bind(this.todos));
//
//     // Rerender on changes
//     this.dispatcher.listenTo(this.todos, "update change reset", this.todos_view.render.bind(this.todos_view));
//
//     // Handle toggling completion
//     this.dispatcher.listenTo(this.todos_view, "toggle_complete", this.todos.toggleComplete.bind(this.todos));
//
//     // Handle total completion
//     this.dispatcher.listenTo(this.data, "complete_all", this.todos.completeAll.bind(this.todos));
//
//     // Handle clear all and clear finished
//     this.dispatcher.listenTo(this.data, "clear_finished", this.todos.clearFinished.bind(this.todos));
//     this.dispatcher.listenTo(this.data, "clear_all",this.todos.reset.bind(this.todos));
//   },
//
//   addTodo: function(data) {
//     var todo = new this.todos.model({
//       content: data.value,
//       id: this.todos.count
//     });
//
//     this.todos.unshift(todo);
//
//     this.todos.count++;
//   }
// };
//
// app.init();

var app = {
  init: function() {
    this.bind();
    this.data = new Input();
    this.lists = new Todos();
    this.list_view = new ListView({ collection: this.lists });
    this.aside_view = new AsideView({ collection: this.lists });

    this.dispatcher = _.extend({}, Backbone.Events);

    // Listen to data input
    // Listen to user trying to save content/t{{ getUnfinishedLists lists }}itle
    this.dispatcher.listenTo(this.data, "add_data", this.addTodo.bind(this));
    // Delete a list
    this.dispatcher.listenTo(this.data, "remove_list", this.lists.remove.bind(this.lists));
    // Complete all todos in a list
    this.dispatcher.listenTo(this.data, "complete_all", this.lists.completeList.bind(this.lists));
    // Clear finished todos in a list
    this.dispatcher.listenTo(this.data, "clear_finished", this.lists.clearFinished.bind(this.lists));

    // List view listen to data input
    // Done on this.addTodo above
    // List view listen to input remove
    this.dispatcher.listenTo(this.data, "remove_list", this.list_view.reset.bind(this.list_view));
    // List view listen to input complete all and clear finished
    this.dispatcher.listenTo(this.data, "complete_all clear_finished", this.list_view.render.bind(this.list_view));

    // Listen to toggling completed
    this.dispatcher.listenTo(this.list_view, "toggle-complete", this.lists.toggleComplete.bind(this.lists));
    // List view needs to trigger a delete todo
    this.dispatcher.listenTo(this.list_view, "remove-todo", this.lists.removeTodo.bind(this.lists));
    // List view triggers edit-todo
    this.dispatcher.listenTo(this.list_view, "edit-todo", this.lists.editTodo.bind(this.lists));

    // Aside view listen to to rerender
    this.dispatcher.listenTo(this.data, "add_data remove_list complete_all clear_finished", this.aside_view.render.bind(this.aside_view));
    this.dispatcher.listenTo(this.list_view, "toggle-complete remove-todo", this.aside_view.render.bind(this.aside_view));

    // // List View listen to:
    // // - Aside view click on list
    // //    Show that as h1
    // //    Render that list
    this.dispatcher.listenTo(this.aside_view, "display-list", this.list_view.render.bind(this.list_view));
  },

  bind: function() {
    $("#toggle_aside").on("click", function() {
      $(this).toggleClass("toggle_aside_button");
      $("aside").toggleClass("toggle_aside_view");
    });
  },

  addTodo: function(data) {
    var current_list = this.lists.get(data.title);
    if ( current_list ) {
      current_list.add({ content: data.content });
    } else {
      this.lists.add(new List({ id: data.title }));
    }

    this.list_view.render({
      id: data.title
    });
  }
};

app.init();
