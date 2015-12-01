import React from 'react';

// you should not change this file
const SKIP_PROPERTIES = {
  length: true,
  name: true,
  prototype: true,
  toString: true,
  arguments: true,
  caller: true,
};

class SimpleProxy {
  constructor(InitialComponent) {
    this.CurrentComponent = null;

    // keep ProxyComponent mutable
    this.ProxyComponent = function() {
      return InitialComponent.apply(this, arguments);
    };

    this.ProxyComponent.prototype = {};

    this.update(InitialComponent);
  }

  getComponent() {
    return this.ProxyComponent;
  }

  update(NextComponent) {
    this.ProxyComponent.prototype = NextComponent.prototype;
    return;

    Object.getOwnPropertyNames(NextComponent.prototype).forEach(key => {
      if (key in SKIP_PROPERTIES) {
        return;
      }

      this.ProxyComponent.prototype[key] = NextComponent.prototype[key];
    });

    this.ProxyComponent.prototype.__proto__ = NextComponent.prototype.__proto__;

    // console.log(NextComponent); // Counter constructor
    // console.log(NextComponent.__proto__); // ReactComponent constructor
    // console.log(NextComponent.prototype); // Counter Composed
    // console.log(NextComponent.prototype.__proto__); // ReactComponent Composed

    this.CurrentComponent = NextComponent;

}}

export default SimpleProxy;
