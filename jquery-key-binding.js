/* global jQuery:false */
(function ($, window, document) {
  'use strict'

  // Create the defaults once
  var pluginName = 'keyBinding'
  var defaults = {
    propertyName: 'value'
  }

  // The actual plugin constructor
  function Plugin (element, options) {
    this.element = element

    this.settings = $.extend({}, defaults, options)
    this._defaults = defaults
    this._name = pluginName
    this.init()
  }

  $.extend(Plugin.prototype, {
    init: function () {
      this.styleContainer()
      this.createInput()
      this.createLabel()

      this.setBinding(this.settings.key)
      $(this.element).click(function (event) {
        this.$label.hide()
        this.$input.val('').show().focus()
      }.bind(this))
    },

    createInput: function () {
      this.$input = $('<input type="text" />')
        .css({
          outline: 'none',
          border: 'none',
          width: '40px',
          fontSize: '30px',
          textAlign: 'center',
          display: 'none'
        })
      $(this.element).append(this.$input)
      this.$input.keydown(function (event) {
        event.preventDefault()
        this.setBinding(event.key)
        this.$input.val('').hide()
        this.$label.show()
      }.bind(this))

      this.$input.blur(function () {
        this.$input.val('').hide()
        this.$label.show()
      }.bind(this))
    },

    createLabel: function () {
      this.$label = $('<span></span>')
        .css({
          fontSize: '40px',
          textTransform: 'uppercase'
        })
      $(this.element).append(this.$label)
    },

    styleContainer: function () {
      $(this.element).css({
        width: '40px',
        height: '40px',
        border: '1px solid black',
        textAlign: 'center',
        borderRadius: '3px'
      })
    },

    setBinding: function (key) {
      this.settings.key = key
      this.settings.bindings[this.settings.name] = key
      $(this.element).find('span').text(key)// key => this.getLabelText(key)
    }
  })

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' +
          pluginName, new Plugin(this, options))
      }
    })
  }
})(jQuery, window, document)
