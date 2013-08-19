// qgr-cntrl-incremental

define(function (require) {
  var $ = require('jquery');
  var _ = require('underscore');
  var Backbone = require('backbone');
  var Handlebars = require('handlebars');
  var incremental_tmpl = require('text!tmpl/incremental.html');


  var IncrementalSearch = Backbone.Model.extend({
    // Has attrs:
    //  - search_val (search input value)

    get_subtree: function() {
      if (this.get('search_val')) {
        return {
          imatch: [
            this.get('col'),
            this.get('search_val')
          ]
        };
      }
    }

  });

  var IncrementalSearchView = Backbone.View.extend({
    // Represent an individual checkbox with a view.

    tmpl: Handlebars.compile(incremental_tmpl),

    events: {
      'change input': 'set_choice',
      'keyup input': 'set_choice',
      'input input': 'set_choice'
    },

    initialize: function(options) {
      _.bindAll(this, 'render', 'set_choice')

      this.search_model = this.options.search_model;
      this.label = this.options.label;
      this.placeholder = this.options.placeholder;
    },

    render: function() {
      var t = this;

      var render_content = this.tmpl({
        label: this.label,
        placeholder: this.placeholder,
        id: this.el.id + 'incremental',
      })
      this.$el.html(render_content);
      return this
    },

    set_choice: function(e) {
      this.search_model.set('search_val', e.currentTarget.value);
    },

  });


  // Return exports.
  return {
    IncrementalSearch: IncrementalSearch,
    IncrementalSearchView: IncrementalSearchView,
  };

});

