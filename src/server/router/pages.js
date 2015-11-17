import fs from 'fs';

import {renderToString} from 'react-dom/server';
import nunjucks from 'nunjucks';
import React from 'react';
import generateRoutes from '../../client/generateRoutes';
import {match, RoutingContext} from 'react-router';

const templateString = fs.readFileSync('./template/page.html', {encoding: 'utf8'});

function renderPages(req, res){
  match({routes: generateRoutes('server'), location: req.url},
    (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send(nunjucks.renderString(templateString, {
        title: 'testTitle',
        content: renderToString(<RoutingContext {...renderProps}/>),
      }));
    } else {
      res.status(404).send('Not found')
    }
  });
}

export default renderPages;
