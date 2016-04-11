var Input = Backbone.View.extend({
  template: Handlebars.compile($("#input_template").html()),

  el: $("form"),

  events: {
    "keypress input": "keypressEvents",
    "click input[type='checkbox']": "completeAll",
    "click #clear_finished": "clearFinished",
    "click #clear_all": "removeList",
    "focus input[type='text']": "uncheck",
    "click div#save_list": "newList"
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
  },

  newList: function() {
    console.log($("ul#todos").attr("data-title"));
    if ( $("ul#todos").attr("data-title") == true ) {
      this.trigger("new-list");
      this.render();
      // $("header h1").text('todos');
    } else {
      if ( $("#content_title").is(":visible") ) {
        console.log('stuff');
        $("#content_title").attr("placeholder", "Please, enter a title").focus();
      } else {
        this.toggleInputs();
        $("#content_title").attr("placeholder", "Please, enter a title").focus();
      }
    }
  },

  keypressEvents: function(e) {
    var $content = this.$el.find("#content");
    var $content_title = this.$el.find("#content_title");

    if ( e.which == 13 && e.shiftKey ){
      this.newList();
      return;
    }

    if ( $content_title.is(":visible") ) {
      if ( e.which == 13) {
        if ( !!this.getTitle() !== true ) {
          this.newList();
          return;
        }
        $("ul#todos").attr("data-title", this.getTitle());
        $("header h1").text(this.getTitle());
        $content_title.attr("placeholder", "Title, please");
        this.trigger("add_data", this.getData());
        this.el.reset();
        this.toggleInputs();
      }
    } else if ( $content.is(":visible") ) {
      if ( e.which == 13) {
        this.trigger("add_data", this.getData());
        this.el.reset();
      }
    }
  },

  getTitle: function() {
    var data_title = this.$el.serializeArray()[1].value;
    return data_title;
  },

  getData: function() {
    var data_content = this.$el.serializeArray()[0].value;
    var data_title = $("ul#todos").attr("data-title");

    // data = { name: "content_title", value: "title"}
    var data = {
      title: data_title,
      content: data_content
    };

    return data;
  },

  toggleInputs: function() {
    var check_visible = this.$el.find("#content").is(":visible");
    if ( check_visible ) {
      this.$el.find("#content").toggle();
      this.$el.find("#content_title").toggle().focus();
    } else {
      this.$el.find("#content_title").toggle();
      this.$el.find("#content").toggle().focus();
    }
  },

  completeAll: function(e) {
    this.trigger("complete_all", { id: this.getData().title });
  },

  clearFinished: function() {
    this.trigger("clear_finished", { id: this.getData().title });
  },

  removeList: function() {
    this.trigger("remove_list", { id: this.getData().title });
    this.render();
    $("h1").text("todos");
  },

  uncheck: function() {
    this.$el.find("input[type='checkbox']").prop("checked", false);
  }
});
