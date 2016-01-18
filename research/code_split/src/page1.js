require.ensure(['./vendor.js'], (require) => {
  const {default: name} = require('./vendor');
  console.log(`hello ${name}!`);
});
