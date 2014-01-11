var Choice = Backbone.Model.extend({

});

var Choices = Backbone.Collection.extend({
  model: Choice,
  url: "http://jgmacbookpro.local:3000/api/v1/terms"
});

ChoicesView = Backbone.View.extend({
  el: '#choices',

  initialize: function() {
    this.template = _.template($('#choices-template').html());
    this.collection.bind("reset", this.render, this);
  },

  render: function() {
    console.log("just rendered");
    var renderedContent = this.template(this.collection);
    $(this.el).html(renderedContent);
    return this;
  }
});

$(document).ready(function () {
  var choices = new Choices;
  var view = new ChoicesView({ collection: choices });

  $('input#search').keyup(function() {
    choices.fetch({ 
      data: { 
        q: $('input#search').val(),
        terms: []
      }
      , reset: true
    })
  })

  $('input#search').on("focus", function(e) {
    $(this).hide();
    webkitRequestAnimationFrame(function() { 
      $(window).scrollTop(80);
      $(this).show();
    }.bind(this));
  });




});