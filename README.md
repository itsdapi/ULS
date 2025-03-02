# Ulearning Tools

## Development

if you need to fetch something, do this
```ts
let XMLHttpRequestNode: any;
if (typeof window === 'undefined') {
  // We're in Node.js
  const { XMLHttpRequest: NodeXMLHttpRequest } = require('xmlhttprequest');
  XMLHttpRequestNode = NodeXMLHttpRequest;
} else {
  // We're in a browser
  XMLHttpRequestNode = XMLHttpRequest;
}

const xhr = new XMLHttpRequestNode();
// do something with xhr
```

We can now run with `npm run build`, the script will be executed and the output will be in the `dist` folder.

When you need to apply to the `Shortcuts`, just simply copy the `dist/index.cjs` content to text block

```html
<body><script>
<!--your script here-->
</script></body>
```

Remember to update your `.env` file to something generic before tying to apply in `shortcuts`
