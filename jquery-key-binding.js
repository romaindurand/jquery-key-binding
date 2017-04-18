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
      this.settings.size = this.settings.size || 40

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
          width: this.settings.size,
          fontSize: this.getFontSize('1'),
          borderRadius: '3px',
          textAlign: 'center',
          display: 'none',
          position: 'relative'
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
          fontFamily: 'monospace',
          display: 'table-cell',
          verticalAlign: 'middle'
        })
      $(this.element).append(this.$label)
    },

    styleContainer: function () {
      $(this.element).css({
        width: this.settings.size,
        height: this.settings.size,
        border: '1px solid black',
        textAlign: 'center',
        borderRadius: '3px',
        display: 'table'
      })
    },

    setKey: function (key) {
      this.settings.key = key
      var labelText = this.getLabelText(key)
      var fontSize = this.getFontSize(labelText)
      this.$label.css({fontSize: fontSize}).text(labelText)
      $(this.element).data('keyBinding', {
        key: this.settings.key,
        name: this.settings.name
      })
    },

    getFontSize: function (text) {
      var $clone = $('<span style="font-size: 5; font-family: monospace; visibility: hidden">' + text + '</span>')
      $('body').append($clone)
      var size
      while ($clone.width() < this.settings.size && $clone.height() < this.settings.size) {
        size = parseInt($clone.css('font-size'), 10)
        $clone.css('font-size', size + 1)
      }
      $clone.remove()
      return size
    },

    getLabelText: function (key) {
      key = {
        'Escape': 'Esc',
        'Control': 'Ctrl',
        'AltGraph': 'AltGr',
        'Delete': 'Del',
        'Backspace': 'Back',
        'Enter': '⏎',
        'ArrowLeft': '←',
        'ArrowUp': '↑',
        'ArrowRight': '→',
        'ArrowDown': '↓',
        'Insert': 'Ins',
        ' ': 'Space'
      }[key] || key
      return key.length > 1 ? key : key.toUpperCase()
    }
  })

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options))
      }
    })
  }
})(jQuery, window, document)
