'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./header.css');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
  }

  _createClass(Header, [{
    key: 'renderSidebar',
    value: function renderSidebar() {
      var element = document.getElementById('sidebar'),
          style = window.getComputedStyle(element),
          width = style.getPropertyValue('width');
      var sidebarWidht = width.slice(0, -2);

      if (sidebarWidht > 0) {
        document.getElementById('sidebar').style.width = "0";
        document.getElementById('content').style.marginLeft = "0";
      } else {
        document.getElementById('sidebar').style.width = "200px";
        document.getElementById('content').style.marginLeft = "200px";
      }
    }
  }, {
    key: '_logout',
    value: function _logout() {
      window.location.replace('http://localhost:9990/auth/realms/genny1/protocol/openid-connect/logout?redirect_uri=http://localhost:3000');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          user = _props.user,
          logo = _props.logo;

      if (user === undefined) {
        user = {
          image: './Images/user.png',
          name: 'sam'
        };
      }
      if (logo === undefined) {
        logo = "logo";
      }

      return _react2.default.createElement(
        'div',
        { className: 'navbar' },
        _react2.default.createElement(
          'i',
          { className: 'navbar-brand material-icons', onClick: this.renderSidebar.bind(this) },
          'menu'
        ),
        _react2.default.createElement(
          'a',
          { className: 'navbar-brand', href: '#' },
          logo
        ),
        _react2.default.createElement(
          'ul',
          { className: 'nav navbar-nav navbar-right' },
          _react2.default.createElement(
            'button',
            { className: 'badge1', 'data-badge': '6' },
            _react2.default.createElement(
              _reactBootstrap.DropdownButton,
              { title: _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'mail_outline'
                ), style: { height: "40px", marginTop: "-4px", background: "none", border: "none" } },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { href: '#books' },
                'Email'
              )
            )
          ),
          _react2.default.createElement(
            'button',
            { className: 'badge2', 'data-badge': '6' },
            _react2.default.createElement(
              _reactBootstrap.DropdownButton,
              { title: _react2.default.createElement(
                  'i',
                  { className: 'material-icons' },
                  'notifications_none'
                ), style: { marginTop: "-4px", height: "40px", background: "none", border: "none" } },
              _react2.default.createElement(
                _reactBootstrap.MenuItem,
                { href: '#books' },
                'Notification'
              )
            )
          ),
          _react2.default.createElement(
            'span',
            { className: 'userProfile' },
            _react2.default.createElement(
              'li',
              { className: 'user' },
              _react2.default.createElement(
                'button',
                { className: 'drop' },
                _react2.default.createElement(
                  _reactBootstrap.DropdownButton,
                  { title: _react2.default.createElement(
                      'div',
                      { className: 'displayUser' },
                      _react2.default.createElement('img', { className: 'userImage', src: user.image, alt: 'user profile' }),
                      _react2.default.createElement(
                        'text',
                        { style: { fontSize: "15px" } },
                        user.name
                      ),
                      _react2.default.createElement('span', { className: 'glyphicon glyphicon-triangle-bottom' })
                    ), style: { marginTop: "-4px", height: "40px", background: "none", border: "none" } },
                  _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { href: '#podcasts' },
                    'profile',
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons', style: { fontSize: "18px", float: "right", paddingRight: "5px" } },
                      'person_outline'
                    )
                  ),
                  _react2.default.createElement('span', { className: 'divider' }),
                  _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { href: '#podcasts' },
                    'setting',
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons', style: { fontSize: "18px", float: "right", paddingRight: "5px" } },
                      'settings'
                    )
                  ),
                  _react2.default.createElement('span', { className: 'divider' }),
                  _react2.default.createElement(
                    _reactBootstrap.MenuItem,
                    { href: '#podcasts', onClick: this._logout.bind(this) },
                    'logout',
                    _react2.default.createElement(
                      'i',
                      { className: 'material-icons', style: { fontSize: "18px", float: "right", paddingRight: "5px" } },
                      'exit_to_app'
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react.Component);

exports.default = Header;