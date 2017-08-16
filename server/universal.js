import {StyleSheetServer} from 'aphrodite'
import reducers from '../src/reducers';
import Layout from '../src/components/Layout';
import Auth from '../src/Auth';

const path = require('path')
const fs = require('fs')

const React = require('react')
const {createStore} = require('redux');
const {Provider} = require('react-redux')
const {renderToString} = require('react-dom/server')
const {StaticRouter} = require('react-router-dom')

const auth = new Auth();

function configureStore(initialState, reducer) {
  const store = createStore(reducer);
  return store;
}

const store = configureStore({}, reducers);

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{


    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const context = {}
    const {html, css} = StyleSheetServer.renderStatic(() => renderToString(<Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <Layout loading={true} auth={auth} />
      </StaticRouter>
    </Provider>));


    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      res.redirect(301, context.url)
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('<div id="root"></div>', `<div id="root">${html}</div>`).replace('</style>', `${css.content}</style>`);
      res.send(RenderedApp)
    }

  })

}
