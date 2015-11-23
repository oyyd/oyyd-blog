Windows 8.1

Intel(R) Core(TM) i5-4210M CPU @ 2.60GHz 2.59GHz

RAM: 8.00GB

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

NODE_ENV=production node lib/index.js

React 14.0.2 ejs 2.3.4

7981 7172 17905

9043 6904 17743

11718 7421 16763

8165 7592 19261

8034 8030 17437