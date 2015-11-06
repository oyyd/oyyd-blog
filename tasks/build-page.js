const path = require('path');
const fs = require('fs');

const del = require('del');
const gulp = require('gulp');
const ejs = require('ejs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const join = path.join;

const prefix = process.cwd();
const pages = ['About'];

require('./gen-lib');

gulp.task('build-page', ['gen-lib'], (done) => {
  const About = require('../lib/client/pages/About');
  const readTemplate = new Promise((resolve, reject) => {
    fs.readFile(join(prefix, './template/page.html'), {encoding: 'utf8'}, (err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  });

  readTemplate.then((templateStr) => {
    const markup = ReactDOMServer.renderToString(React.createElement(About));

    const pageStr = ejs.render(templateStr, {
      title: 'test-title',
      content: markup,
      bootstrap: '/about/bundle.js',
    });

    return new Promise((resolve, reject) => {
      fs.writeFile(join(prefix, './about/index.html'), pageStr, (err) => {
        if(err){
          reject(err);
        }else{
          resolve();
        }
      });
    });
  }).then(() => {
    done();
  });
});
