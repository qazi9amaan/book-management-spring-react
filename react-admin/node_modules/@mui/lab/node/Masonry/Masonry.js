"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.style = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _system = require("@mui/system");

var _utils = require("@mui/utils");

var _core = require("@mui/core");

var _styles = require("@mui/material/styles");

var _masonryClasses = require("./masonryClasses");

var _MasonryContext = _interopRequireDefault(require("./MasonryContext"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "component", "columns", "spacing"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _core.unstable_composeClasses)(slots, _masonryClasses.getMasonryUtilityClass, classes);
};

const style = ({
  ownerState,
  theme
}) => {
  let styles = {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    overflow: 'auto',
    width: '100%',
    rowGap: 2,
    boxSizing: 'border-box'
  };
  const base = {};
  Object.keys(theme.breakpoints.values).forEach(breakpoint => {
    if (ownerState.spacing[breakpoint] != null) {
      base[breakpoint] = true;
    }
  });
  const spacingValues = (0, _system.unstable_resolveBreakpointValues)({
    values: ownerState.spacing,
    base
  });
  const transformer = (0, _system.createUnarySpacing)(theme);

  const spacingStyleFromPropValue = propValue => {
    return {
      columnGap: (0, _system.getValue)(transformer, propValue)
    };
  };

  styles = (0, _extends2.default)({}, styles, (0, _system.handleBreakpoints)({
    theme
  }, spacingValues, spacingStyleFromPropValue));
  const columnValues = (0, _system.unstable_resolveBreakpointValues)({
    values: ownerState.columns,
    base
  });

  const columnStyleFromPropValue = propValue => {
    return {
      gridTemplateColumns: `repeat(${propValue}, 1fr)`
    };
  };

  styles = (0, _utils.deepmerge)(styles, (0, _system.handleBreakpoints)({
    theme
  }, columnValues, columnStyleFromPropValue));
  return styles;
};

exports.style = style;
const MasonryRoot = (0, _styles.styled)('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  }
})(style);
const Masonry = /*#__PURE__*/React.forwardRef(function Masonry(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMasonry'
  });
  const masonryRef = React.useRef();
  const {
    children,
    className,
    component = 'div',
    columns = 4,
    spacing = 1
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    spacing,
    columns
  });
  const classes = useUtilityClasses(ownerState);
  const contextValue = React.useMemo(() => ({
    spacing
  }), [spacing]);
  let didWarn = false;
  React.useEffect(() => {
    // scroller always appears when masonry's height goes beyond 2,000px on Chrome
    const handleScroll = () => {
      if (masonryRef.current.clientHeight === 1998 && !didWarn) {
        console.warn(['MUI: The Masonry can have the maximum height of 2,000px on Chrome browser.', 'Items that go beyond this height fail to be rendered on Chrome browser.', 'You can find more in this open issue: https://github.com/mui-org/material-ui/issues/27934'].join('\n')); // eslint-disable-next-line react-hooks/exhaustive-deps

        didWarn = true;
      }
    };

    const container = masonryRef.current;
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, masonryRef);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_MasonryContext.default.Provider, {
    value: contextValue,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MasonryRoot, (0, _extends2.default)({
      as: component,
      className: (0, _clsx.default)(classes.root, className),
      ref: handleRef,
      ownerState: ownerState
    }, other, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? Masonry.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component. It's recommended to be `<MasonryItem />`s.
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Number of columns.
   * @default 4
   */
  columns: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])), _propTypes.default.number, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = Masonry;
exports.default = _default;