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
  choices.fetch({ 
    data: { 
      q: "va",
      terms: []
    },
    reset: true
  })
});