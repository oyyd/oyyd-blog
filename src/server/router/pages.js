import fs from 'fs';

import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';
import nunjucks from 'nunjucks';
import React from 'react';
import createStore from '../../client/state/createStore';
import generateRoutes from '../../client/generateRoutes';
import {match, RoutingContext} from 'react-router';
import escapeJSONString from '../utils/escapeJSONString';

const templateString = fs.readFileSync('./template/page.html', {encoding: 'utf8'});
const routes = generateRoutes(null);
function renderPages(req, res) {
  match({routes, location: req.url},
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        res.status(200).send(nunjucks.renderString(templateString, {
          content: renderToString(
            <RoutingContext {...renderProps}/>
          ),
          initialState: escapeJSONString(JSON.stringify(createStore())),
        }));
      } else {
        res.status(404).send('Not found');
      }
    });
}

export default renderPages;
