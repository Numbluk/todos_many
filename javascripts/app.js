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
    // this.list_view = new ListView();
    // this.aside_view = new AsideView();

    this.dispatcher = _.extend({}, Backbone.Events);

    // Listen to user trying to save content/title
    this.dispatcher.listenTo(this.data, "add_data", this.addTodo.bind(this));

    // Events:
    // this.input new-list
    // this.input add_data

    // Listen to toggling completed

    // Delete a list
    this.dispatcher.listenTo(this.data, "remove_list", this.lists.remove.bind(this.lists));

    // Complete all todos in a list
    this.dispatcher.listenTo(this.data, "complete_all", this.lists.completeList.bind(this.lists));

    // Clear finished todos in a list
    this.dispatcher.listenTo(this.data, "clear_finished", this.lists.clearFinished.bind(this.lists));

    // Rerender on:
    // - any change all removed events
    //   - rerender aside and same ul

    // Render new ul on:
    // - click on aside (grab that list item with data for id)
    // - brand new ul on new list event
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
  }
};

app.init();
