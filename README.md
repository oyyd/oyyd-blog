#oyyd blog

### Environment

node > 4.2.x

###Develop

```
npm run dev
```

or

```
webpack -w
```

###Commands

translate md to html and generate the rss-feed file from posts:

```
gulp gen-list
```

Release:

```
gulp release
```

Develop:

```
node server.js
```

###set up

###TODO

* Support both ajax and html loading when rendering a same page

* refactor server side rendering

* refactor building process

* Use md content instead of the html as Initial state of the post when server rendering
