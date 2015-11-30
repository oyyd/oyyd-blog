const SKIP_PROPERTIES = {
  length: true,
  name: true,
};

// you should not change this file
class SimpleProxy {
  constructor(InitialComponent) {
    this.CurrentComponent = null;

    // keep ProxyComponent mutable
    this.ProxyComponent = function() {
      InitialComponent.constructor.apply(this);
      console.log(this.__proto__);
    };

    this.update(InitialComponent);
  }

  getComponent() {
    return this.ProxyComponent;
  }

  update(NextComponent) {
    Object.getOwnPropertyNames(NextComponent).forEach(key => {
      if (key in SKIP_PROPERTIES) {
        return;
      }

      this.ProxyComponent[key] = NextComponent[key];
    });

    Object.getOwnPropertyNames(NextComponent.prototype).forEach(key => {
      if (key in SKIP_PROPERTIES) {
        return;
      }

      this.ProxyComponent.prototype[key] = NextComponent.prototype[key];
    });

    this.CurrentComponent = NextComponent;
  }
}

export default SimpleProxy;
