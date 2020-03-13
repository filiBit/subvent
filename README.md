# Subvent
**Create** event subscriptions in DOM. **Manage** them with `update`, `unmount` and `mount` methods.

*Abstracts DOM's `addEventListener`, and `removeEventListener` methods into a subscription object.*

## Installation
#### In node projects:
```
npm install subvent --save
```
```js
import {Subvent} from 'subvent'
```

#### In browsers:
```html
<head>
  <script src="https://unpkg.com/subvent@1.1.2/dist/iife/subvent.js"></script>
</head>
```

## Usage
Get the DOM nodes first:
```js
const el1 = document.getElementById('element-1');
const el2 = // ...
const el3 = // ...
const el4 = // ...
```

**Define the event subscription**
```js
const evtSub1 = new Subvent(el1, 'click', () => {...});
```
- creates an instance of Subvent
- the instance represents an event subscription

The shorthand **`on`** function is also available:
```js
const evtSub2 = on(el2, 'click', () => {...});
```

If preferred, use an object to pass parameters:
```js
const evtSub3 = on({node: el3, name: 'click', handler: () => {...}});
```

### Manage the subscription

**Unmount it:**
```js
evtSub1.unmount();
evtSub1.isMounted; // false
```

**Mount it:**
```js
evtSub1.mount()
evtSub1.isMounted; // true
```

**Update it:**
```js
  evtSub2.update({name: 'dblclick',})
```
- takes care of mounting and unmounting for us
- only changes the specifed arguments, retaining the old variables.

**Duplicate it:**
```js
const evtSub4 = evtSub3.duplicate({node: el4});
```
- uses Subvent's instance as a template for creating a new instance
- instance being duplicated provides fallback values for undefined parameters

### Online Playgrounds
Try it out on **[CodePen](https://codepen.io/filibit/pen/KKpXLjb)**, or **[CodeSandbox](https://codesandbox.io/s/subvent-playground-ttde9)**

### Read a blog post about the library
[Subvent: Managing event subscriptions in DOM](https://dev.to/filibit/subvent-js-managing-dom-event-subscriptions-39g1)
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
  - **`Subvent.prototype.update()`** - redefines the subscription with new parameters overwriting the old properties, those not overwritten, retain the old value. It handles unmounting and mounting so You don't have to. It accepts the same parameter syntax as it's contructor (`Subvent`), except the fact that all arguments are optional (those not passed, retain the old value)
  - **`Subvent.prototype.unmount()`** - calls `removeEventListener(this.name, this._handler_, this.options)`
  - **`Subvent.prototype.mount()`** - calls `addEventListener(this.name, this._handler_, this.options)`
  - **`Subvent.handler`** - maps to `handler` parameter (see above)
  - **`Subvent._handler`** - if `handler` is a function, `_handler` wraps it, and ensures the `handler` is called with `thisArg` value `apply`ed to it
  - **`Subvent.prototype.duplicate`** - creates a new instance providing it's own properties as fallback values for undefined parameters
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
