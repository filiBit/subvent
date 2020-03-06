# Subvent
**Define** and **Reference** DOM event subscriptions. **Update**, **unmount** and **mount** them.

## Installation
#### In node projects:
```
npm install --save subvent
```
```js
const {on} = require('subvent')
```

#### In browsers:
```html
<head>
  <script src="unpkg.com/subvent@1.0.0./dist/browser/subvent.js"></script>
</head>
```

## Usage
**Define the event subscription**
```js
// get a dom Node
const titleEl = document.getElementById('titleEl')

// define the event subscription
const evSub1 = on(titleEl, 'click', clickHandler)

// also, supports an object argument
const evSub2 = on({node: titleEl, name: 'click', handler: clickHandler})
```
**Manage the subscription:**
```js
  // update any value or values
  // (no need to unmount and mount afterwards, this is handled automatically)
  evSub1.update({name: 'mouseenter',})

  // unmount it when needed
  evSub1.unmount()
  // mount it when needed
  evSub1.mount()
```
## Online Playground:
Try it out on **[codesandbox](https://codesandbox.io/s/subvent-playground-ttde9)**
___
___
## Documentation
This library provides two variables: **`Subvent`** (which is a constructor function), and it's shorthand **`on`** (which is a factory function that returns instance of `Subvent`).
___
### Subvent
**`Subvent`** is a constructor function that auto-subscribes to a DOM node on instantiation.

#### Syntax
```js
// traditional arguments:
new Subvent(node, name, handler [, options, defaults, thisArg]);

// object argument:
new Subvent({node, name, handler [, options, defaults: object, thisArg]});
```
- `node` - any DOM node that implements EventTarget interface
- `name` - string (corresponds to [addEventListener's](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax) `type` parameter)
- `handler` - a function, or an object (corresponds to [addEventListener's](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax) `listener` parameter)
- `options` - An object (corresponds to [addEventListener's](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Syntax) `options` paramter)
- `defaults` - an object containing properties to be used as default fallback values for parameters. Another `Subvent` instance can be used as `defaults` and technically become a template for other `Subvent` instances.
- `thisArg` - an object that is applied to handler as it's execution context, defaults to `node`

*Return value:*
instance of `Subvent`

##### Properties
  - **`Subvent.isMounted`** - boolean indicating subscription's mount state
  - **`Subvent.node`** - maps to `node` parameter (see above)
  - **`Subvent.name`** - maps to `name` parameter (see above)
  - **`Subvent.options`** - maps to `option` parameter (see above)
  - **`Subvent.thisArg`** - an object that is applied to `handler` as it's execution context, defaults to `node`


##### Methods
  - **`Subvent.update()`** - redefines the subscription with new parameters overwriting the old properties, those not overwritten, retain the old value. It handles unmounting and mounting so You don't have to. It accepts the same parameter syntax as it's contructor (`Subvent`), except the fact that all arguments are optional (those not passed, retain the old value)
  - **`Subvent.unmount()`** - calls `removeEventListener(this.name, this._handler_, this.options)`
  - **`Subvent.mount()`** - calls `addEventListener(this.name, this._handler_, this.options)`
  - **`Subvent.handler`** - maps to `handler` parameter (see above)
  - **`Subvent._handler`** - if `handler` is a function, `_handler` wraps it, and ensures the `handler` is called with `this` value `apply`ed to it.
___
### on
**`on`** is a so called "factory function" because it returns an instance, in this case an `Subvent` instance. The function also has the same syntax as the `Subvent`. Consider it a shorthand for `Subvent` syntax.

#### Syntax
`on()` has the same parameter syntax as the `Subvent`
*Return value*
instance of `Subvent`

#### Definition
```js
function on() {
  return new Eventity(arguments)
}
```
___
### Two ways to instantiate Subvent
Just to conclude:
```js
// both of these statements do the same thing: return an Subvent instance
on({node: titleEl, name: 'click', handler: clickHandler})
new Subvent({node: titleEl, name: 'click', handler: clickHandler})
```
### Creating a custom `Subvent` shorthand
```js
// a custom shorthand function, with a not so short name, but you get the point
function customShorthand() {
  return new Subvent(arguments)
}

customShorthand({node: titleEl, name: 'click', handler: clickHandler})
```
___
___
### Community
Everyone is welcome to report any potential issue, or share an idea for a new feature.
Colaborations are also welcome, but rather difficult at the moment, since I haven't established build procedure yet.

Anyone is welcome to contact me at filip.biterski@gmail.com
