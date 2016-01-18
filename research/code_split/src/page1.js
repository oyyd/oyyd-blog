require.ensure([], (require) => {
  var a = false;
  if (a) {
    const vendor = require('./vendor');
    console.log(vendor);
  }
});
