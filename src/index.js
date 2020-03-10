export function on() {
  // consider this function a shorthand for "new Subvent()" syntax
  return new Subvent(arguments)
}

// constructor function
export function Subvent() {
  // possible feature check to be included:
  // if (!document.addEventListener)
  //   throw new this.errorFactory(
  //     'A browser does not support addEventListener method.'
  //   )

  // methods
  this.mount = function() {
    this.node.addEventListener(this.name, this._handler, this.options)
    this.isMounted = true
  }

  this.unmount = function() {
    this.node.removeEventListener(this.name, this._handler, this.options)
    this.isMounted = false
  }

  this.update = function() {
    var shouldRemount = false
    if (this.isMounted) {
      this.unmount()
      shouldRemount = true
    }
    this.initialize(arguments)
    if (shouldRemount) this.mount()
  }

  this.initialize = function() {
    // method for constructing and updating Subvent instance

    // block scope variables
    var args = arguments[0]
    var node, name, handler, options, defaults, thisArg

    // traverse args array until user-defined arguments are reached,
    // and then assign their parent array to args
    while (
      args[0] &&
      typeof args[0] === 'object' &&
      args[0].length !== undefined
    ) {
      args = args[0]
    }

    // error check: arguments length
    if (!args.length)
      throw this.errorFactory('No arguments have been specifed.')

    // if the first argument is an object that wraps arguments
    // as it's properties set it to initArgs
    if (args[0] && typeof args[0] === 'object' && !args[0].nodeType) {
      args = args[0]
    }

    if (args.length !== undefined) {
      // if initArgs is an array-like object (instance of Arguments)
      node = args[0]
      name = args[1]
      handler = args[2]
      options = args[3]
      defaults = args[4]
      thisArg = args[5]
    } else {
      // if initArgs is an object
      node = args.node
      name = args.name
      handler = args.handler
      options = args.options
      defaults = args.defaults
      thisArg = args.thisArg
    }

    // if some argument is missing, determine it's default value
    if (!node) node = defaults ? defaults.node : this.node
    if (!name) name = defaults ? defaults.name : this.name
    if (!handler) handler = defaults ? defaults.handler : this.handler
    if (!options) options = defaults ? defaults.options : this.options
    if (!thisArg)
      thisArg =
        defaults && defaults.thisArg !== defaults.node
          ? defaults.thisArg
          : this.thisArg && this.thisArg !== this.node
          ? this.thisArg
          : node
    // if thisArg isn't specified, thisArg is set
    // to default.thisArg if it exists and if it wasn't refering
    // to a default.node, in case it was, thisArg is set to
    // a previous one(this.thisArg), but only if the previous one
    // wasn't refering to a previous node, in such case thisArg is set
    // to a new (current) node, otherwise to a dom node
    // ---
    // above logic may be hard to understand, but it is intuitive,
    // and it probably behaves as You already expect it to.

    // error check: check each argument
    if (!node || !node.nodeType)
      throw this.errorFactory('node not specified, or of invalid type')
    if (!name || typeof name !== 'string')
      throw this.errorFactory('name not specified, or of invalid type')
    if (
      !handler &&
      (typeof handler !== 'function' || typeof handler !== 'object')
    )
      throw this.errorFactory('handler not specified, or of invalid type')

    this.node = node
    this.name = name
    this.handler = handler
    this.options = options
    this.thisArg = thisArg
    this._handler =
      typeof this.handler === 'function'
        ? function() {
            this.handler.apply(this.thisArg, arguments)
          }
        : this.handler
    if (typeof this._handler === 'function')
      this._handler = this._handler.bind(this)
  }

  this.errorFactory = function(message) {
    var err = new Error(message)
    err.name = 'Subvent'
    return err
  }

  // construction:
  this.isMounted = false // local instance state
  this.initialize(arguments)
  this.mount()
}
