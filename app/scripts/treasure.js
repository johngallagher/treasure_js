var Choice = Backbone.Model.extend({

});

var Choices = Backbone.Collection.extend({
  model: Choice,
  termList: function() {
    return this.models.map(function(choice) {
      return choice.get('id');
    });
  }
});
var choices = new Choices;

var Dropdown = Backbone.Collection.extend({
  model: Choice,
  url: "http://jgmacbookpro.local:3000/api/v1/terms",
  initialSearch: function() {
    this.search('');
    $('input#search').focus();
  },
  search: function(term) {
    this.fetch({
      data: { 
        q: term,
        terms: choices.termList()
      }
      , reset: true
    })
  }
});

var dropdown = new Dropdown;

DropdownView = Backbone.View.extend({
  el: '#dropdown',
  events: {
    'click': 'selectChoice'
  },

  initialize: function() {
    this.template = _.template($('#drop-template').html());
    this.collection.bind("reset", this.render, this);
  },

  selectChoice: function(el) {
    choice = dropdown.findWhere({name: $(el.target).data('name'), text: $(el.target).data('text')});
    dropdown.remove(choice);
    choices.add(choice);
    this.render();
    dropdown.initialSearch();
  },

  render: function() {
    console.log("just rendered dropdown");
    var renderedContent = this.template(this.collection);
    $(this.el).html(renderedContent);
    return this;
  }
});

var dropdownView = new DropdownView({ collection: dropdown });

ChoicesView = Backbone.View.extend({
  el: '#choices',
  events: {
    'keyup': 'search'
  },

  initialize: function() {
    this.template = _.template($('#choices-template').html());
    this.collection.bind("reset", this.render, this);
    this.collection.bind("add", this.render, this);
  },

  search: function(el) {
    dropdown.search($('input#search').val());
  },

  render: function() {
    console.log("just rendered choices");
    var renderedContent = this.template(this.collection);
    $(this.el).html(renderedContent);
    return this;
  }
});

var choicesView = new ChoicesView({ collection: choices });

$(document).ready(function () {
  dropdown.reset();
  choices.reset();

  // $('input#search').keyup(function() {
  //   dropdown.fetch({ 
  //     data: { 
  //       q: $('input#search').val(),
  //       terms: []
  //     }
  //     , reset: true
  //   });
  // });

  // $('input#search').on("focus", function(e) {
  //   $(this).hide();
  //   webkitRequestAnimationFrame(function() { 
  //     $(window).scrollTop(80);
  //     $(this).show();
  //   }.bind(this));
  // });
});