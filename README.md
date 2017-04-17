# jquery-key-binding
A simple jQuery plugin that handles keyboard binding via named events

## Installation
Include the script in your page after jQuery

```html
<script src="js/jquery-key-binding.js"></script>
```

## Usage
```javascript
// use the plugin on any empty div/span
$('#emptyDiv').keyBinding({
  name: 'openAlert', // the event's name
  key: 'a' // default binding
})

// when the key is pressed, the selected element emits a 'keyBinding' event
// that bubbles up to the document
$(document).on('keyBinding', (event, binding) => {
  // the second argument contains the event's name
  if (binding.name === 'openAlert') alert('Hello World!')
})
```

## Demo
https://jsfiddle.net/cpqsqk5u/5/
