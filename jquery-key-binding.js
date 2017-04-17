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
      this.bindEvent()
      this.setKey(this.settings.key)

      $(this.element).click(function (event) {
        this.$label.hide()
        this.$input.val('').show().focus()
      }.bind(this))
    },

    bindEvent: function () {
      $(document).keydown(function (event) {
        if (event.target.nodeName === 'INPUT') return
        if (event.key === this.settings.key) {
          $(this.element).trigger('keyBinding', {name: this.settings.name})
        }
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
          display: 'none',
          position: 'relative',
          top: '2px'
        })
      $(this.element).append(this.$input)
      this.$input.keydown(function (event) {
        event.preventDefault()
        this.setKey(event.key)
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
          position: 'relative',
          fontFamily: 'monospace'
        })
      $(this.element).append(this.$label)
    },

    styleContainer: function () {
      $(this.element).css({
        width: '40px',
        height: '40px',
        border: '1px solid black',
        textAlign: 'center',
        borderRadius: '3px',
        display: 'block',
        margin: '5px',
        float: 'left'
      })
    },

    setKey: function (key) {
      this.settings.key = key
      $(this.element).find('span').text(this.getLabelText(key))
    },

    getLabelText: function (key) {
      key = {
        'Escape': 'Esc',
        'Control': 'Ctrl',
        'AltGraph': 'AltGr',
        'Delete': 'Del',
        'Backspace': 'Back',
        'Enter': '⮐',
        'ArrowLeft': '←',
        'ArrowUp': '↑',
        'ArrowRight': '→',
        'ArrowDown': '↓',
        'MediaPlayPause': '⏵⏸',
        'MediaStop': '⏹',
        'CapsLock': '⮸',
        'Insert': 'Ins',
        ' ': 'Space'
      }[key] || key
      var fontSize = Math.max(Math.floor(key.length * -7.6 + 47.6), 6)
      var top = Math.min(Math.floor(key.length * 4.6 - 8.6), 17)
      this.$label.css({
        fontSize: fontSize,
        top: top
      })
      return key.length > 1 ? key : key.toUpperCase()
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
