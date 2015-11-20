import fs from 'fs';

import {renderToString} from 'react-dom/server';
import nunjucks from 'nunjucks';
import React from 'react';
import createApp from '../../client/createApp';
import createStore from '../../client/state/createStore';
import {match, RoutingContext} from 'react-router';

const templateString = fs.readFileSync('./template/page.html', {encoding: 'utf8'});

function renderPages(req, res) {
  match({routes: createApp(createStore(), 'server'), location: req.url},
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        res.status(200).send(nunjucks.renderString(templateString, {
          content: renderToString(<RoutingContext {...renderProps}/>),
        }));
      } else {
        res.status(404).send('Not found');
      }
    });
}

export default renderPages;
