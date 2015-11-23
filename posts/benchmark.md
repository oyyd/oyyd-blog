```html
<div>
  <label>数值:<%=count%></label>
  <button>+1</button>
</div>
```

```js
import React from 'react';

class Counter extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <label>数值:{this.props.count}</label>
        <button>+1</button>
      </div>
    );
  }
}

export default Counter;
```

```js
import React from 'react';

const Counter = React.createClass({
  render() {
    return (
      <div>
        <label>数值:{this.props.count}</label>
        <button>+1</button>
      </div>
    );
  },
});

export default Counter;
```
```
renderToString(<Counter count={10}/>);

ejs.render(template, {
  count: 10,
});
```

4690 3147 21299

3979 3451 16141

3809 3009 16727

5207 3920 18758

4182 2934 15439