var AsideView = Backbone.View.extend({
  el: $("aside"),

  template: Handlebars.compile($("#aside_template").html()),

  events: {
    "click li": "displayList"
  },

  render: function() {
    $("aside").html(this.template({ lists: this.collection }));
  },

  initialize: function() {
    Handlebars.registerHelper("getFinishedLists", function(lists) {
      var return_html = "<ul id='completed_lists'>";
      lists.each(function(list) {
        if ( list.areAllCompleted() ) {
          return_html += "\n<li data-title='" + list.id + "'>";

          return_html += "\n<div class='title'>";
          return_html += "\n" + list.id + "\n</div>";

          return_html += "\n</li>";
        }
      });
      return_html += "\n</ul>";
      return return_html;
    });

    Handlebars.registerHelper("getUnfinishedLists", function(lists) {
      var return_html = "<ul id='incompleted_lists'>";
      lists.each(function(list) {
        if ( !list.areAllCompleted()) {
          return_html += "\n<li data-title='" + list.id + "'>";

          return_html += "\n<div class='title'>";
          return_html += "\n" + list.id + "\n</div>";

          return_html += "\n<div class='todos_left'>";
          return_html += "\n" + list.getTodosUnfinished() + "\n</div>";

          return_html += "\n</li>";
        }
      });
      return_html += "\n</ul>";
      return return_html;
    });

    Handlebars.registerHelper("getTotalTodosUnfinished", function(lists) {
      return lists.getTotalTodosUnfinished();
    });

    this.render();
  },

  displayList: function(e) {
    var title = $(e.target).closest("li").attr("data-title");
    this.trigger("display-list", { id: title });
  }
});
