'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _app_bar = require('react-toolbox/lib/app_bar');

var _app_bar2 = _interopRequireDefault(_app_bar);

var _navigation = require('react-toolbox/lib/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _counter = require('./components/counter');

var _counter2 = _interopRequireDefault(_counter);

var _reactCommon = require('./components/react-common');

var _reactCommon2 = _interopRequireDefault(_reactCommon);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BoilerplateApp = function BoilerplateApp(_ref) {
  var rootUri = _ref.rootUri;
  return _react2.default.createElement(
    _reactRouterDom.BrowserRouter,
    null,
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _app_bar2.default,
        null,
        _react2.default.createElement(
          _navigation2.default,
          { className: _styles2.default.nav },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '' + rootUri + _constants2.default.ROUTER.HOME },
            'Home'
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '' + rootUri + _constants2.default.ROUTER.REACT_COMMON },
            'React Common Examples'
          )
        )
      ),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '' + rootUri + _constants2.default.ROUTER.HOME, component: _counter2.default }),
      _react2.default.createElement(_reactRouterDom.Route, { path: '' + rootUri + _constants2.default.ROUTER.REACT_COMMON, component: _reactCommon2.default })
    )
  );
};

process.env.NODE_ENV !== "production" ? BoilerplateApp.propTypes = {
  rootUri: _react2.default.PropTypes.string
} : void 0;
BoilerplateApp.defaultProps = {
  rootUri: ''
};

exports.default = BoilerplateApp;
module.exports = exports['default'];