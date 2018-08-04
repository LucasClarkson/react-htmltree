'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _server = require('react-dom/server');

var _htmlparser = require('htmlparser2');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _themes = require('../themes/');

var _themes2 = _interopRequireDefault(_themes);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: HTMLTree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Public interface of the component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isBrowser = typeof HTMLElement !== 'undefined';

/**
 *
 */

var HTMLTree = function (_Component) {
  _inherits(HTMLTree, _Component);

  function HTMLTree() {
    _classCallCheck(this, HTMLTree);

    return _possibleConstructorReturn(this, (HTMLTree.__proto__ || Object.getPrototypeOf(HTMLTree)).apply(this, arguments));
  }

  _createClass(HTMLTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var source = this.props.source;
      // keep state of provided source and representation view in sync

      if (isBrowser && source instanceof HTMLElement) {
        var element = (0, _reactDom.findDOMNode)(this);
        this.observer = new MutationObserver(function (mutations) {
          var inception = mutations.some(function (mutation) {
            return element.contains(mutation.target);
          });
          if (!inception) {
            _this2.forceUpdate();
          }
        }).observe(source, {
          childList: true,
          subtree: true,
          attributes: true
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          source = _props.source,
          theme = _props.theme,
          defaultsAndEventHandlers = _objectWithoutProperties(_props, ['source', 'theme']);

      var origin = isBrowser && source instanceof HTMLElement && source;
      var tree = (0, _htmlparser.parseDOM)( /** sourceText **/
      origin ? source.outerHTML : _react2.default.isValidElement(source) ? (0, _server.renderToString)(source) : source.replace(/<!DOCTYPE(.|\n|\r)*?>/i, ''));

      var componentStyles = (0, _themes2.default)(theme);

      return _react2.default.createElement(
        'div',
        { className: 'HTMLTree' },
        _react2.default.createElement('style', { dangerouslySetInnerHTML: { __html: componentStyles } }),
        _react2.default.createElement(_Container2.default, _extends({ tree: tree, origin: origin || null }, defaultsAndEventHandlers))
      );
    }
  }]);

  return HTMLTree;
}(_react.Component);

HTMLTree.defaultProps = {
  theme: 'chrome-devtools',
  defaultExpandedTags: ['html', 'body']
};
HTMLTree.propTypes = {
  source: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.node, _propTypes2.default.instanceOf(isBrowser ? HTMLElement : Object)]).isRequired,
  theme: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]).isRequired,
  defaultExpandedTags: _propTypes2.default.array.isRequired,
  customRender: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onUnfocus: _propTypes2.default.func
};
exports.default = HTMLTree;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvSFRNTFRyZWUuanN4Il0sIm5hbWVzIjpbImlzQnJvd3NlciIsIkhUTUxFbGVtZW50IiwiSFRNTFRyZWUiLCJzb3VyY2UiLCJwcm9wcyIsImVsZW1lbnQiLCJvYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJtdXRhdGlvbnMiLCJpbmNlcHRpb24iLCJzb21lIiwibXV0YXRpb24iLCJjb250YWlucyIsInRhcmdldCIsImZvcmNlVXBkYXRlIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsInN1YnRyZWUiLCJhdHRyaWJ1dGVzIiwiZGlzY29ubmVjdCIsInRoZW1lIiwiZGVmYXVsdHNBbmRFdmVudEhhbmRsZXJzIiwib3JpZ2luIiwidHJlZSIsIm91dGVySFRNTCIsIlJlYWN0IiwiaXNWYWxpZEVsZW1lbnQiLCJyZXBsYWNlIiwiY29tcG9uZW50U3R5bGVzIiwiX19odG1sIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiZGVmYXVsdEV4cGFuZGVkVGFncyIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsIm9uZU9mVHlwZSIsInN0cmluZyIsIm5vZGUiLCJpbnN0YW5jZU9mIiwiT2JqZWN0IiwiaXNSZXF1aXJlZCIsIm9iamVjdCIsImFycmF5IiwiY3VzdG9tUmVuZGVyIiwiZnVuYyIsIm9uSG92ZXIiLCJvbkV4cGFuZCIsIm9uU2VsZWN0Iiwib25VbmZvY3VzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBTUE7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OzsrZUFiQTs7Ozs7O0FBZUEsSUFBTUEsWUFBWSxPQUFPQyxXQUFQLEtBQXVCLFdBQXpDOztBQUVBOzs7O0lBR3FCQyxROzs7Ozs7Ozs7Ozt3Q0F5QkE7QUFBQTs7QUFBQSxVQUNUQyxNQURTLEdBQ0UsS0FBS0MsS0FEUCxDQUNURCxNQURTO0FBRWpCOztBQUNBLFVBQUlILGFBQWFHLGtCQUFrQkYsV0FBbkMsRUFBZ0Q7QUFDOUMsWUFBTUksVUFBVSwyQkFBWSxJQUFaLENBQWhCO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQixJQUFJQyxnQkFBSixDQUFxQixVQUFDQyxTQUFELEVBQWU7QUFDbEQsY0FBTUMsWUFBWUQsVUFBVUUsSUFBVixDQUFlLFVBQUNDLFFBQUQ7QUFBQSxtQkFBY04sUUFBUU8sUUFBUixDQUFpQkQsU0FBU0UsTUFBMUIsQ0FBZDtBQUFBLFdBQWYsQ0FBbEI7QUFDQSxjQUFJLENBQUNKLFNBQUwsRUFBZ0I7QUFDZCxtQkFBS0ssV0FBTDtBQUNEO0FBQ0YsU0FMZSxFQUtiQyxPQUxhLENBS0xaLE1BTEssRUFLRztBQUNqQmEscUJBQVcsSUFETTtBQUVqQkMsbUJBQVMsSUFGUTtBQUdqQkMsc0JBQVk7QUFISyxTQUxILENBQWhCO0FBVUQ7QUFDRjs7OzJDQUVxQjtBQUNwQixVQUFJLEtBQUtaLFFBQVQsRUFBbUI7QUFDakIsYUFBS0EsUUFBTCxDQUFjYSxVQUFkO0FBQ0Q7QUFDRjs7OzZCQUVPO0FBQUEsbUJBQ2lELEtBQUtmLEtBRHREO0FBQUEsVUFDRUQsTUFERixVQUNFQSxNQURGO0FBQUEsVUFDVWlCLEtBRFYsVUFDVUEsS0FEVjtBQUFBLFVBQ29CQyx3QkFEcEI7O0FBR04sVUFBTUMsU0FBU3RCLGFBQWFHLGtCQUFrQkYsV0FBL0IsSUFBOENFLE1BQTdEO0FBQ0EsVUFBTW9CLE9BQU8sMkJBQVM7QUFDcEJELGVBQVNuQixPQUFPcUIsU0FBaEIsR0FDQ0MsZ0JBQU1DLGNBQU4sQ0FBcUJ2QixNQUFyQixJQUErQiw0QkFBZUEsTUFBZixDQUEvQixHQUF3REEsT0FBT3dCLE9BQVAsQ0FBZSx3QkFBZixFQUF5QyxFQUF6QyxDQUY5QyxDQUFiOztBQUtBLFVBQU1DLGtCQUFrQixzQkFBVVIsS0FBVixDQUF4Qjs7QUFFQSxhQUNFO0FBQUE7QUFBQSxVQUFLLFdBQVUsVUFBZjtBQUNFLGlEQUFPLHlCQUF5QixFQUFFUyxRQUFRRCxlQUFWLEVBQWhDLEdBREY7QUFFRSxzQ0FBQyxtQkFBRCxhQUFXLE1BQU1MLElBQWpCLEVBQXVCLFFBQVFELFVBQVEsSUFBdkMsSUFBaURELHdCQUFqRDtBQUZGLE9BREY7QUFNRDs7OztFQWxFbUNTLGdCOztBQUFqQjVCLFEsQ0FFWjZCLFksR0FBZTtBQUNwQlgsU0FBTyxpQkFEYTtBQUVwQlksdUJBQXFCLENBQUMsTUFBRCxFQUFTLE1BQVQ7QUFGRCxDO0FBRkg5QixRLENBT1orQixTLEdBQVk7QUFDakI5QixVQUFRK0Isb0JBQVVDLFNBQVYsQ0FBb0IsQ0FDMUJELG9CQUFVRSxNQURnQixFQUUxQkYsb0JBQVVHLElBRmdCLEVBRzFCSCxvQkFBVUksVUFBVixDQUFxQnRDLFlBQVlDLFdBQVosR0FBMEJzQyxNQUEvQyxDQUgwQixDQUFwQixFQUlMQyxVQUxjO0FBTWpCcEIsU0FBT2Msb0JBQVVDLFNBQVYsQ0FBb0IsQ0FDekJELG9CQUFVRSxNQURlLEVBRXpCRixvQkFBVU8sTUFGZSxDQUFwQixFQUdKRCxVQVRjO0FBVWpCUix1QkFBcUJFLG9CQUFVUSxLQUFWLENBQWdCRixVQVZwQjtBQVdqQkcsZ0JBQWNULG9CQUFVVSxJQVhQO0FBWWpCQyxXQUFTWCxvQkFBVVUsSUFaRjtBQWFqQkUsWUFBVVosb0JBQVVVLElBYkg7QUFjakJHLFlBQVViLG9CQUFVVSxJQWRIO0FBZWpCSSxhQUFXZCxvQkFBVVU7QUFmSixDO2tCQVBBMUMsUSIsImZpbGUiOiJjb21wb25lbnRzL0hUTUxUcmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbXBvbmVudDogSFRNTFRyZWVcbiAqXG4gKiBQdWJsaWMgaW50ZXJmYWNlIG9mIHRoZSBjb21wb25lbnRcbiAqL1xuXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBmaW5kRE9NTm9kZSB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IHJlbmRlclRvU3RyaW5nIH0gZnJvbSAncmVhY3QtZG9tL3NlcnZlcidcbmltcG9ydCB7IHBhcnNlRE9NIH0gZnJvbSAnaHRtbHBhcnNlcjInXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmltcG9ydCBnZXRTdHlsZXMgZnJvbSAnLi4vdGhlbWVzLydcbmltcG9ydCBDb250YWluZXIgZnJvbSAnLi9Db250YWluZXInXG5cbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIVE1MVHJlZSBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICB0aGVtZTogJ2Nocm9tZS1kZXZ0b29scycsXG4gICAgZGVmYXVsdEV4cGFuZGVkVGFnczogWydodG1sJywgJ2JvZHknXVxuICB9O1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc291cmNlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMubm9kZSxcbiAgICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKGlzQnJvd3NlciA/IEhUTUxFbGVtZW50IDogT2JqZWN0KSxcbiAgICBdKS5pc1JlcXVpcmVkLFxuICAgIHRoZW1lOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub2JqZWN0XG4gICAgXSkuaXNSZXF1aXJlZCxcbiAgICBkZWZhdWx0RXhwYW5kZWRUYWdzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICBjdXN0b21SZW5kZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uSG92ZXI6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uRXhwYW5kOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblNlbGVjdDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25VbmZvY3VzOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIGNvbXBvbmVudERpZE1vdW50KCl7XG4gICAgY29uc3QgeyBzb3VyY2UgfSA9IHRoaXMucHJvcHNcbiAgICAvLyBrZWVwIHN0YXRlIG9mIHByb3ZpZGVkIHNvdXJjZSBhbmQgcmVwcmVzZW50YXRpb24gdmlldyBpbiBzeW5jXG4gICAgaWYgKGlzQnJvd3NlciAmJiBzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGZpbmRET01Ob2RlKHRoaXMpXG4gICAgICB0aGlzLm9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICBjb25zdCBpbmNlcHRpb24gPSBtdXRhdGlvbnMuc29tZSgobXV0YXRpb24pID0+IGVsZW1lbnQuY29udGFpbnMobXV0YXRpb24udGFyZ2V0KSlcbiAgICAgICAgaWYgKCFpbmNlcHRpb24pIHtcbiAgICAgICAgICB0aGlzLmZvcmNlVXBkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSkub2JzZXJ2ZShzb3VyY2UsIHtcbiAgICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCl7XG4gICAgaWYgKHRoaXMub2JzZXJ2ZXIpIHtcbiAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgY29uc3QgeyBzb3VyY2UsIHRoZW1lLCAuLi5kZWZhdWx0c0FuZEV2ZW50SGFuZGxlcnMgfSA9IHRoaXMucHJvcHNcblxuICAgIGNvbnN0IG9yaWdpbiA9IGlzQnJvd3NlciAmJiBzb3VyY2UgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiBzb3VyY2VcbiAgICBjb25zdCB0cmVlID0gcGFyc2VET00oLyoqIHNvdXJjZVRleHQgKiovXG4gICAgICBvcmlnaW4gPyBzb3VyY2Uub3V0ZXJIVE1MIDpcbiAgICAgIChSZWFjdC5pc1ZhbGlkRWxlbWVudChzb3VyY2UpID8gcmVuZGVyVG9TdHJpbmcoc291cmNlKSA6IHNvdXJjZS5yZXBsYWNlKC88IURPQ1RZUEUoLnxcXG58XFxyKSo/Pi9pLCAnJykpXG4gICAgKVxuXG4gICAgY29uc3QgY29tcG9uZW50U3R5bGVzID0gZ2V0U3R5bGVzKHRoZW1lKVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiSFRNTFRyZWVcIj5cbiAgICAgICAgPHN0eWxlIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogY29tcG9uZW50U3R5bGVzIH19Lz5cbiAgICAgICAgPENvbnRhaW5lciB0cmVlPXt0cmVlfSBvcmlnaW49e29yaWdpbnx8bnVsbH0gey4uLmRlZmF1bHRzQW5kRXZlbnRIYW5kbGVyc30vPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbn1cbiJdfQ==
