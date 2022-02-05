# Web Page Renumberer

## About

This program is used to take in HTML and an element that has indexed number out of order. It will then renumber them.

## Building

You have to have [Node](https://nodejs.org/en/), npm, [go](https://go.dev/), and [Wails 2](https://wails.io/) installed first.

Go into the `frontend` directory and run `npm install`. Then go back to the root directory and run `wails build`. You executable will be in the `build` directory.

## How to Use

Put the web page text in the main textarea. Put the element type that prefixes the numbering in the `Element Type` box. When you press `Show Rows`,
 a list of lines with the specified line numbering will be shown. When you press `Renumber`, those indexes will be renumbered. This will not 
 work properly if the first number (number 1) is missing as it looks for a 1 to restart the numbering.

For example, with this numbering:

```html
<h3>1. This is the first</h3>
<h3>3. This is the second</h3>
```

You would put `h3` in the `Element Type` and press `Show Rows`. Each row will then be shown. Pressing `Renumber` will make the textarea have:

```html
<h3>1. This is the first</h3>
<h3>2. This is the second</h3>
```

Of couse, this is a very simple example.

This was written with [Wails 2](https://wails.io/) and [Svelte](https://svelte.dev/).
