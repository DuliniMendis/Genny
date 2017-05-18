'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _header = require('./header');

Object.defineProperty(exports, 'Header', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_header).default;
  }
});

var _sidebar = require('./body/sidebar');

Object.defineProperty(exports, 'Sidebar', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_sidebar).default;
  }
});

var _content = require('./body/content');

Object.defineProperty(exports, 'Content', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_content).default;
  }
});

var _body = require('./body');

Object.defineProperty(exports, 'Body', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_body).default;
  }
});

var _footer = require('./footer');

Object.defineProperty(exports, 'Footer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_footer).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }