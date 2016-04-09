var Todos = Backbone.Collection.extend({
  model: List,

  completeList: function(id_as_obj) {
    this.get(id_as_obj).completeAll();
  },

  clearFinished: function(id_as_obj) {
    this.get(id_as_obj).clearFinished();
  }
});
