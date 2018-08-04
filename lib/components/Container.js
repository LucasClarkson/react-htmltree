'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utilities = require('../utilities');

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * # Component: Container
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Update & delegation layer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var isBrowser = typeof HTMLElement !== 'undefined';

/**
 *
 */

var Container = function (_Component) {
  _inherits(Container, _Component);

  function Container(props) {
    _classCallCheck(this, Container);

    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

    _this.state = {
      root: _this.getRoot(props),
      latest: null
    };
    return _this;
  }

  _createClass(Container, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.tree !== this.props.tree) {
        this.setState({
          root: this.getRoot(nextProps),
          latest: null
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onHover = _props.onHover,
          customRender = _props.customRender;
      var root = this.state.root;

      return _react2.default.createElement(
        'div',
        { className: 'Container' },
        _react2.default.createElement(
          'div',
          { className: 'Container__Nodes' },
          _react2.default.createElement(_Node2.default, { node: root, update: this.onUpdate.bind(this), onHover: onHover, customRender: customRender })
        ),
        _react2.default.createElement('input', { className: 'Container__Input', type: 'text', ref: function ref(input) {
            _this2.input = input;
          },
          onFocus: this.toggleFocus.bind(this),
          onBlur: this.toggleFocus.bind(this)
        })
      );
    }

    /**
     * Retrieve an immutable representation of the nodes (incl. extended/trimmed data)
     * @param  {Object}  props.tree                - [description]
     * @param  {Array}   props.defaultExpandedTags - [description]
     * @return {Object}                            - [description]
     */

  }, {
    key: 'getRoot',
    value: function getRoot(_ref) {
      var tree = _ref.tree,
          defaultExpandedTags = _ref.defaultExpandedTags;

      transformNodes(tree, [], true);
      return _immutable2.default.fromJS(tree[0]);

      // recursive enumeration
      function transformNodes(tree, keyPath, initial) {
        tree.forEach(function (node, i) {
          node.depth = (0, _utilities.getDepth)(node);
          node.selector = (0, _utilities.getSelector)(node.name ? node : node.parent);
          node.keyPath = initial ? keyPath : [].concat(_toConsumableArray(keyPath), ['children', i]);
          node.state = defaultExpandedTags.indexOf(node.name) > -1 ? { expanded: true } : {};
          if (node.children) {
            if (node.children.length) {
              node.children = node.children.filter(function (child) {
                return child.type !== 'text' || child.data.trim().length;
              });
              transformNodes(node.children, node.keyPath);
            } else {
              delete node.children;
            }
          }
          if (node.attribs && !Object.keys(node.attribs).length) {
            delete node.attribs;
          }
          delete node.parent;
          delete node.next;
          delete node.prev;
        });
      }
    }

    /**
     * [toggleFocus description]
     * @param  {Event} e - [description]
     */

  }, {
    key: 'toggleFocus',
    value: function toggleFocus(e) {
      var _this3 = this;

      e.preventDefault();
      e.stopPropagation();

      var latest = this.state.latest;


      if (e.type === 'focus') {
        return this.onUpdate(null, latest, 'toggleFocus', { selected: true, unfocused: false });
      }
      // === blur || delay to check upcoming click
      this.timeout = setTimeout(function () {
        return _this3.onUpdate(null, latest, 'toggleFocus', { selected: false, unfocused: true });
      }, 100);
    }

    /**
     * Reducer for different actions based on the type
     * @param  {String} type      - [description]
     * @param  {Object} component - [description]
     * @param  {Object} nextState - [description]
     */

    /**
     * Reducer for different actions based on the type
     * @param  {Event}          e         - [description]
     * @param  {ReactComponent} component - [description]
     * @param  {String}         type      - [description]
     * @param  {Object}         data      - [description]
     */

  }, {
    key: 'onUpdate',
    value: function onUpdate(e, component, type, data) {
      var _context2;

      if (e && e.preventDefault) e.preventDefault();
      if (e && e.stopPropagation) e.stopPropagation();

      clearTimeout(this.timeout);

      var _props2 = this.props,
          origin = _props2.origin,
          onHover = _props2.onHover,
          onExpand = _props2.onExpand,
          onSelect = _props2.onSelect,
          onUnfocus = _props2.onUnfocus;
      var node = component.props.node;
      var _state = this.state,
          root = _state.root,
          latest = _state.latest;


      var name = node.get('name');
      var attribs = node.get('attribs');
      var selector = node.get('selector');

      var element = origin ? selector.match('>') ? origin.querySelectorAll(selector)[0] : origin : { // shallow representation
        tagName: name || node.get('type'),
        attributes: attribs && attribs.toJS(),
        selector: selector
      };

      var keyPath = [].concat(_toConsumableArray(node.get('keyPath').toJS()), ['state']);
      var updater = null; // toggle: (value) => !value

      switch (type) {

        case 'toggleHover':
          if (onHover && onHover.call(this, element, component) !== undefined) return;
          if (typeof data.tailed !== 'undefined') {
            keyPath = [].concat(_toConsumableArray(keyPath), ['tailed']);
            updater = function updater() {
              return data.tailed;
            };
            break;
          }
          return;

        case 'toggleExpand':
          if (onExpand && onExpand.call(this, element, component) !== undefined) return;
          // check: unfolding all children
          if (e.altKey && e.ctrlKey) {
            return this.setState({
              root: root.setIn([].concat(_toConsumableArray(node.get('keyPath').toJS())), (0, _utilities.setDeep)(node, 'children', ['state', 'expanded'], true))
            });
          }
          // TODO:
          // - fix [issue#1]('tailed')
          // console.log(node.toJSON(), data, e.target)
          keyPath = [].concat(_toConsumableArray(keyPath), ['expanded']);
          updater = function updater(expanded) {
            return !expanded;
          };
          break;

        case 'triggerSelect':
          if (latest) {
            var _context;

            this.input.blur();
            var latestKeyPath = [].concat(_toConsumableArray(latest.props.node.get('keyPath').toJS()), ['state']);
            return this.setState({
              root: root.withMutations(function (map) {
                return map.setIn([].concat(_toConsumableArray(latestKeyPath), ['tailed']), false).setIn([].concat(_toConsumableArray(latestKeyPath), ['selected']), false).setIn([].concat(_toConsumableArray(latestKeyPath), ['unfocused']), false).setIn([].concat(_toConsumableArray(keyPath), ['tailed']), data.tailed);
              }),
              latest: component
            }, (_context = this.input).focus.bind(_context));
          }
          return this.setState({
            root: root.setIn([].concat(_toConsumableArray(keyPath), ['tailed']), data.tailed),
            latest: component
          }, (_context2 = this.input).focus.bind(_context2));

        case 'toggleFocus':
          if (data.selected) {
            if (onSelect && onSelect.call(this, element, component) !== undefined) return;
          } else {
            if (onUnfocus && onUnfocus.call(this, element, component) !== undefined) return;
          }
          return this.setState({
            root: root.withMutations(function (map) {
              return map.setIn([].concat(_toConsumableArray(keyPath), ['selected']), data.selected).setIn([].concat(_toConsumableArray(keyPath), ['unfocused']), data.unfocused);
            })
          });
      }

      this.setState({
        root: root.updateIn(keyPath, updater)
      });
    }
  }]);

  return Container;
}(_react.Component);

Container.propTypes = {
  tree: _propTypes2.default.array.isRequired,
  origin: _propTypes2.default.instanceOf(isBrowser && HTMLElement),
  defaultExpandedTags: _propTypes2.default.array.isRequired,
  customRender: _propTypes2.default.func,
  onHover: _propTypes2.default.func,
  onExpand: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  onUnfocus: _propTypes2.default.func
};
exports.default = Container;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udGFpbmVyLmpzeCJdLCJuYW1lcyI6WyJpc0Jyb3dzZXIiLCJIVE1MRWxlbWVudCIsIkNvbnRhaW5lciIsInByb3BzIiwic3RhdGUiLCJyb290IiwiZ2V0Um9vdCIsImxhdGVzdCIsIm5leHRQcm9wcyIsInRyZWUiLCJzZXRTdGF0ZSIsIm9uSG92ZXIiLCJjdXN0b21SZW5kZXIiLCJvblVwZGF0ZSIsImlucHV0IiwidG9nZ2xlRm9jdXMiLCJkZWZhdWx0RXhwYW5kZWRUYWdzIiwidHJhbnNmb3JtTm9kZXMiLCJJbW11dGFibGUiLCJmcm9tSlMiLCJrZXlQYXRoIiwiaW5pdGlhbCIsImZvckVhY2giLCJub2RlIiwiaSIsImRlcHRoIiwic2VsZWN0b3IiLCJuYW1lIiwicGFyZW50IiwiaW5kZXhPZiIsImV4cGFuZGVkIiwiY2hpbGRyZW4iLCJsZW5ndGgiLCJmaWx0ZXIiLCJjaGlsZCIsInR5cGUiLCJkYXRhIiwidHJpbSIsImF0dHJpYnMiLCJPYmplY3QiLCJrZXlzIiwibmV4dCIsInByZXYiLCJlIiwicHJldmVudERlZmF1bHQiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZCIsInVuZm9jdXNlZCIsInRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY29tcG9uZW50IiwiY2xlYXJUaW1lb3V0Iiwib3JpZ2luIiwib25FeHBhbmQiLCJvblNlbGVjdCIsIm9uVW5mb2N1cyIsImdldCIsImVsZW1lbnQiLCJtYXRjaCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YWdOYW1lIiwiYXR0cmlidXRlcyIsInRvSlMiLCJ1cGRhdGVyIiwiY2FsbCIsInVuZGVmaW5lZCIsInRhaWxlZCIsImFsdEtleSIsImN0cmxLZXkiLCJzZXRJbiIsImJsdXIiLCJsYXRlc3RLZXlQYXRoIiwid2l0aE11dGF0aW9ucyIsIm1hcCIsImZvY3VzIiwidXBkYXRlSW4iLCJDb21wb25lbnQiLCJwcm9wVHlwZXMiLCJQcm9wVHlwZXMiLCJhcnJheSIsImlzUmVxdWlyZWQiLCJp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S1csU0FGakIsQ0FBVDtBQUFBLGFBQW5CO0FBRGEsV0FBZCxDQUFQO0FBbkRKOztBQTJEQSxXQUFLckMsUUFBTCxDQUFjO0FBQ1pMLGNBQU1BLEtBQUtzRSxRQUFMLENBQWN2RCxPQUFkLEVBQXVCMkMsT0FBdkI7QUFETSxPQUFkO0FBR0Q7Ozs7RUF4TW9DYSxnQjs7QUFBbEIxRSxTLENBRVoyRSxTLEdBQVk7QUFDakJwRSxRQUFNcUUsb0JBQVVDLEtBQVYsQ0FBZ0JDLFVBREw7QUFFakI1QixVQUFRMEIsb0JBQVVHLFVBQVYsQ0FBcUJqRixhQUFhQyxXQUFsQyxDQUZTO0FBR2pCZSx1QkFBcUI4RCxvQkFBVUMsS0FBVixDQUFnQkMsVUFIcEI7QUFJakJwRSxnQkFBY2tFLG9CQUFVSSxJQUpQO0FBS2pCdkUsV0FBU21FLG9CQUFVSSxJQUxGO0FBTWpCN0IsWUFBVXlCLG9CQUFVSSxJQU5IO0FBT2pCNUIsWUFBVXdCLG9CQUFVSSxJQVBIO0FBUWpCM0IsYUFBV3VCLG9CQUFVSTtBQVJKLEM7a0JBRkFoRixTIiwiZmlsZSI6ImNvbXBvbmVudHMvQ29udGFpbmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIENvbXBvbmVudDogQ29udGFpbmVyXG4gKlxuICogVXBkYXRlICYgZGVsZWdhdGlvbiBsYXllclxuICovXG5cbmltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJ1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgeyBnZXRTZWxlY3RvciwgZ2V0RGVwdGgsIHNldERlZXAgfSBmcm9tICcuLi91dGlsaXRpZXMnXG5pbXBvcnQgTm9kZSBmcm9tICcuL05vZGUnXG5cbmNvbnN0IGlzQnJvd3NlciA9IHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCdcblxuLyoqXG4gKlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250YWluZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdHJlZTogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgb3JpZ2luOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihpc0Jyb3dzZXIgJiYgSFRNTEVsZW1lbnQpLFxuICAgIGRlZmF1bHRFeHBhbmRlZFRhZ3M6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgIGN1c3RvbVJlbmRlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Ib3ZlcjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25FeHBhbmQ6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU2VsZWN0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvblVuZm9jdXM6IFByb3BUeXBlcy5mdW5jXG4gIH07XG5cbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHJvb3Q6IHRoaXMuZ2V0Um9vdChwcm9wcyksXG4gICAgICBsYXRlc3Q6IG51bGxcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzIChuZXh0UHJvcHMpIHtcbiAgICBpZiAobmV4dFByb3BzLnRyZWUgIT09IHRoaXMucHJvcHMudHJlZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHJvb3Q6IHRoaXMuZ2V0Um9vdChuZXh0UHJvcHMpLFxuICAgICAgICBsYXRlc3Q6IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCl7XG4gICAgY29uc3QgeyBvbkhvdmVyLCBjdXN0b21SZW5kZXIgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IHJvb3QgfSA9IHRoaXMuc3RhdGVcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb250YWluZXJfX05vZGVzXCI+XG4gICAgICAgICAgPE5vZGUgbm9kZT17cm9vdH0gdXBkYXRlPXs6OnRoaXMub25VcGRhdGV9IG9uSG92ZXI9e29uSG92ZXJ9IGN1c3RvbVJlbmRlcj17Y3VzdG9tUmVuZGVyfS8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiQ29udGFpbmVyX19JbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcmVmPXsoaW5wdXQpID0+IHsgdGhpcy5pbnB1dCA9IGlucHV0OyB9fVxuICAgICAgICAgIG9uRm9jdXM9ezo6dGhpcy50b2dnbGVGb2N1c31cbiAgICAgICAgICBvbkJsdXI9ezo6dGhpcy50b2dnbGVGb2N1c31cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZSBhbiBpbW11dGFibGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIG5vZGVzIChpbmNsLiBleHRlbmRlZC90cmltbWVkIGRhdGEpXG4gICAqIEBwYXJhbSAge09iamVjdH0gIHByb3BzLnRyZWUgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge0FycmF5fSAgIHByb3BzLmRlZmF1bHRFeHBhbmRlZFRhZ3MgLSBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4ge09iamVjdH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBnZXRSb290ICh7IHRyZWUsIGRlZmF1bHRFeHBhbmRlZFRhZ3MgfSkge1xuICAgIHRyYW5zZm9ybU5vZGVzKHRyZWUsIFtdLCB0cnVlKVxuICAgIHJldHVybiBJbW11dGFibGUuZnJvbUpTKHRyZWVbMF0pXG5cbiAgICAvLyByZWN1cnNpdmUgZW51bWVyYXRpb25cbiAgICBmdW5jdGlvbiB0cmFuc2Zvcm1Ob2RlcyAodHJlZSwga2V5UGF0aCwgaW5pdGlhbCkge1xuICAgICAgdHJlZS5mb3JFYWNoKChub2RlLCBpKSA9PiB7XG4gICAgICAgIG5vZGUuZGVwdGggPSBnZXREZXB0aChub2RlKVxuICAgICAgICBub2RlLnNlbGVjdG9yID0gZ2V0U2VsZWN0b3Iobm9kZS5uYW1lID8gbm9kZSA6IG5vZGUucGFyZW50KVxuICAgICAgICBub2RlLmtleVBhdGggPSBpbml0aWFsID8ga2V5UGF0aCA6IFsuLi5rZXlQYXRoLCAnY2hpbGRyZW4nLCBpXVxuICAgICAgICBub2RlLnN0YXRlID0gZGVmYXVsdEV4cGFuZGVkVGFncy5pbmRleE9mKG5vZGUubmFtZSkgPiAtMSA/IHsgZXhwYW5kZWQ6IHRydWUgfSA6IHt9XG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbi5maWx0ZXIoKGNoaWxkKSA9PiBjaGlsZC50eXBlICE9PSAndGV4dCcgfHwgY2hpbGQuZGF0YS50cmltKCkubGVuZ3RoKVxuICAgICAgICAgICAgdHJhbnNmb3JtTm9kZXMobm9kZS5jaGlsZHJlbiwgbm9kZS5rZXlQYXRoKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgbm9kZS5jaGlsZHJlblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobm9kZS5hdHRyaWJzICYmICFPYmplY3Qua2V5cyhub2RlLmF0dHJpYnMpLmxlbmd0aCkge1xuICAgICAgICAgIGRlbGV0ZSBub2RlLmF0dHJpYnNcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgbm9kZS5wYXJlbnRcbiAgICAgICAgZGVsZXRlIG5vZGUubmV4dFxuICAgICAgICBkZWxldGUgbm9kZS5wcmV2XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBbdG9nZ2xlRm9jdXMgZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge0V2ZW50fSBlIC0gW2Rlc2NyaXB0aW9uXVxuICAgKi9cbiAgdG9nZ2xlRm9jdXMgKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICBjb25zdCB7IGxhdGVzdCB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgaWYgKGUudHlwZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgcmV0dXJuIHRoaXMub25VcGRhdGUobnVsbCwgbGF0ZXN0LCAndG9nZ2xlRm9jdXMnLCB7IHNlbGVjdGVkOiB0cnVlLCB1bmZvY3VzZWQ6IGZhbHNlIH0pXG4gICAgfVxuICAgIC8vID09PSBibHVyIHx8IGRlbGF5IHRvIGNoZWNrIHVwY29taW5nIGNsaWNrXG4gICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5vblVwZGF0ZShudWxsLCBsYXRlc3QsICd0b2dnbGVGb2N1cycsIHsgc2VsZWN0ZWQ6IGZhbHNlLCB1bmZvY3VzZWQ6IHRydWUgfSlcbiAgICB9LCAxMDApXG4gIH1cblxuICAvKipcbiAgICogUmVkdWNlciBmb3IgZGlmZmVyZW50IGFjdGlvbnMgYmFzZWQgb24gdGhlIHR5cGVcbiAgICogQHBhcmFtICB7U3RyaW5nfSB0eXBlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge09iamVjdH0gY29tcG9uZW50IC0gW2Rlc2NyaXB0aW9uXVxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG5leHRTdGF0ZSAtIFtkZXNjcmlwdGlvbl1cbiAgICovXG5cbiAgLyoqXG4gICAqIFJlZHVjZXIgZm9yIGRpZmZlcmVudCBhY3Rpb25zIGJhc2VkIG9uIHRoZSB0eXBlXG4gICAqIEBwYXJhbSAge0V2ZW50fSAgICAgICAgICBlICAgICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1JlYWN0Q29tcG9uZW50fSBjb21wb25lbnQgLSBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICB0eXBlICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqIEBwYXJhbSAge09iamVjdH0gICAgICAgICBkYXRhICAgICAgLSBbZGVzY3JpcHRpb25dXG4gICAqL1xuICBvblVwZGF0ZSAoZSwgY29tcG9uZW50LCB0eXBlLCBkYXRhKSB7XG4gICAgaWYgKGUgJiYgZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgaWYgKGUgJiYgZS5zdG9wUHJvcGFnYXRpb24pIGUuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG5cbiAgICBjb25zdCB7IG9yaWdpbiwgb25Ib3Zlciwgb25FeHBhbmQsIG9uU2VsZWN0LCBvblVuZm9jdXMgfSA9IHRoaXMucHJvcHNcbiAgICBjb25zdCB7IG5vZGUgfSA9IGNvbXBvbmVudC5wcm9wc1xuICAgIGNvbnN0IHsgcm9vdCwgbGF0ZXN0IH0gPSB0aGlzLnN0YXRlXG5cbiAgICBjb25zdCBuYW1lID0gbm9kZS5nZXQoJ25hbWUnKVxuICAgIGNvbnN0IGF0dHJpYnMgPSBub2RlLmdldCgnYXR0cmlicycpXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBub2RlLmdldCgnc2VsZWN0b3InKVxuXG4gICAgY29uc3QgZWxlbWVudCA9IG9yaWdpbiA/IChzZWxlY3Rvci5tYXRjaCgnPicpID8gb3JpZ2luLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpWzBdIDogb3JpZ2luKSA6XG4gICAgICAgICAgICAgICAgICAgIHsgLy8gc2hhbGxvdyByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgICAgICAgICAgIHRhZ05hbWU6IG5hbWUgfHwgbm9kZS5nZXQoJ3R5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiBhdHRyaWJzICYmIGF0dHJpYnMudG9KUygpLFxuICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBzZWxlY3RvclxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICB2YXIga2V5UGF0aCA9IFsuLi5ub2RlLmdldCgna2V5UGF0aCcpLnRvSlMoKSwgJ3N0YXRlJ11cbiAgICB2YXIgdXBkYXRlciA9IG51bGwgLy8gdG9nZ2xlOiAodmFsdWUpID0+ICF2YWx1ZVxuXG4gICAgc3dpdGNoICh0eXBlKSB7XG5cbiAgICAgIGNhc2UgJ3RvZ2dsZUhvdmVyJzpcbiAgICAgICAgaWYgKG9uSG92ZXIgJiYgb25Ib3Zlci5jYWxsKHRoaXMsIGVsZW1lbnQsIGNvbXBvbmVudCkgIT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgICAgIGlmICh0eXBlb2YgZGF0YS50YWlsZWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAga2V5UGF0aCA9IFsuLi5rZXlQYXRoLCAndGFpbGVkJ11cbiAgICAgICAgICB1cGRhdGVyID0gKCkgPT4gZGF0YS50YWlsZWRcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuXG4gICAgICBjYXNlICd0b2dnbGVFeHBhbmQnOlxuICAgICAgICBpZiAob25FeHBhbmQgJiYgb25FeHBhbmQuY2FsbCh0aGlzLCBlbGVtZW50LCBjb21wb25lbnQpICE9PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICAvLyBjaGVjazogdW5mb2xkaW5nIGFsbCBjaGlsZHJlblxuICAgICAgICBpZiAoZS5hbHRLZXkgJiYgZS5jdHJsS2V5KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcm9vdDogcm9vdC5zZXRJbihbLi4ubm9kZS5nZXQoJ2tleVBhdGgnKS50b0pTKCldLCBzZXREZWVwKG5vZGUsICdjaGlsZHJlbicsIFsnc3RhdGUnLCAnZXhwYW5kZWQnXSwgdHJ1ZSkpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICAvLyBUT0RPOlxuICAgICAgICAvLyAtIGZpeCBbaXNzdWUjMV0oJ3RhaWxlZCcpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKG5vZGUudG9KU09OKCksIGRhdGEsIGUudGFyZ2V0KVxuICAgICAgICBrZXlQYXRoID0gWy4uLmtleVBhdGgsICdleHBhbmRlZCddXG4gICAgICAgIHVwZGF0ZXIgPSAoZXhwYW5kZWQpID0+ICFleHBhbmRlZFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd0cmlnZ2VyU2VsZWN0JzpcbiAgICAgICAgaWYgKGxhdGVzdCkge1xuICAgICAgICAgIHRoaXMuaW5wdXQuYmx1cigpXG4gICAgICAgICAgY29uc3QgbGF0ZXN0S2V5UGF0aCA9IFsuLi5sYXRlc3QucHJvcHMubm9kZS5nZXQoJ2tleVBhdGgnKS50b0pTKCksICdzdGF0ZSddXG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcm9vdDogcm9vdC53aXRoTXV0YXRpb25zKChtYXApID0+IG1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEluKFsuLi5sYXRlc3RLZXlQYXRoLCAndGFpbGVkJ10sIGZhbHNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldEluKFsuLi5sYXRlc3RLZXlQYXRoLCAnc2VsZWN0ZWQnXSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0SW4oWy4uLmxhdGVzdEtleVBhdGgsICd1bmZvY3VzZWQnXSwgZmFsc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0SW4oWy4uLmtleVBhdGgsICd0YWlsZWQnXSwgZGF0YS50YWlsZWQpXG4gICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgbGF0ZXN0OiBjb21wb25lbnRcbiAgICAgICAgICB9LCA6OnRoaXMuaW5wdXQuZm9jdXMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHJvb3Q6IHJvb3Quc2V0SW4oWy4uLmtleVBhdGgsICd0YWlsZWQnXSwgZGF0YS50YWlsZWQpLFxuICAgICAgICAgIGxhdGVzdDogY29tcG9uZW50XG4gICAgICAgIH0sIDo6dGhpcy5pbnB1dC5mb2N1cylcblxuICAgICAgY2FzZSAndG9nZ2xlRm9jdXMnOlxuICAgICAgICBpZiAoZGF0YS5zZWxlY3RlZCkge1xuICAgICAgICAgIGlmIChvblNlbGVjdCAmJiBvblNlbGVjdC5jYWxsKHRoaXMsIGVsZW1lbnQsIGNvbXBvbmVudCkgIT09IHVuZGVmaW5lZCkgcmV0dXJuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKG9uVW5mb2N1cyAmJiBvblVuZm9jdXMuY2FsbCh0aGlzLCBlbGVtZW50LCBjb21wb25lbnQpICE9PSB1bmRlZmluZWQpIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICByb290OiByb290LndpdGhNdXRhdGlvbnMoKG1hcCkgPT4gbWFwXG4gICAgICAgICAgICAgICAgICAgICAgLnNldEluKFsuLi5rZXlQYXRoLCAnc2VsZWN0ZWQnXSwgZGF0YS5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgICAuc2V0SW4oWy4uLmtleVBhdGgsICd1bmZvY3VzZWQnXSwgZGF0YS51bmZvY3VzZWQpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgcm9vdDogcm9vdC51cGRhdGVJbihrZXlQYXRoLCB1cGRhdGVyKVxuICAgIH0pXG4gIH1cblxufVxuIl19
