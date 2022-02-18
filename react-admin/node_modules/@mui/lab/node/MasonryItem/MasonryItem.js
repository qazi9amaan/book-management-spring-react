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

var _masonryItemClasses = require("./masonryItemClasses");

var _MasonryContext = _interopRequireDefault(require("../Masonry/MasonryContext"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "component", "columnSpan", "defaultHeight"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return (0, _core.unstable_composeClasses)(slots, _masonryItemClasses.getMasonryItemUtilityClass, classes);
};

const style = ({
  ownerState,
  theme
}) => {
  let styles = {
    width: '100%',
    '& > *': (0, _extends2.default)({
      // all contents should have a width of 100%
      width: '100%',
      boxSizing: 'inherit'
    }, ownerState.hasDefaultHeight && {
      height: '100%'
    }),
    visibility: ownerState.height ? 'visible' : 'hidden',
    gridColumnEnd: `span ${ownerState.columnSpan}`,
    boxSizing: 'inherit'
  };

  if (Array.isArray(ownerState.spacing) || typeof ownerState.spacing === 'object') {
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

    const styleFromPropValue = propValue => {
      const gap = ownerState.height ? Number((0, _system.getValue)(transformer, propValue).replace('px', '')) : 0; // For lazy-loaded images to load properly, masonry item should take up space greater than 1px.
      // Taking into account a row gap of 2px, rowSpan should at least be 2.

      const rowSpan = ownerState.height ? Math.ceil((ownerState.height + gap) / 2) : 2;
      return {
        gridRowEnd: `span ${rowSpan}`,
        paddingBottom: gap === 0 ? 0 : gap - 2
      };
    };

    styles = (0, _extends2.default)({}, styles, (0, _system.handleBreakpoints)({
      theme
    }, spacingValues, styleFromPropValue));
  }

  return styles;
};

exports.style = style;
const MasonryItemRoot = (0, _styles.styled)('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  }
})(style);
const MasonryItem = /*#__PURE__*/React.forwardRef(function MasonryItem(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiMasonryItem'
  });
  const masonryItemRef = React.useRef(null);
  const {
    spacing = 1
  } = React.useContext(_MasonryContext.default);
  const {
    children,
    className,
    component = 'div',
    columnSpan = 1,
    defaultHeight
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const hasDefaultHeight = defaultHeight !== undefined;
  const [height, setHeight] = React.useState(defaultHeight);
  const ownerState = (0, _extends2.default)({}, props, {
    spacing,
    hasDefaultHeight,
    columnSpan,
    height: height < 0 ? 0 : height // MasonryItems to which negative or zero height is passed will be hidden

  });
  const classes = useUtilityClasses(ownerState);
  React.useEffect(() => {
    // Do not create a resize observer in case of provided height masonry
    if (hasDefaultHeight) {
      return undefined;
    }

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    const resizeObserver = new ResizeObserver(([item]) => {
      setHeight(item.contentRect.height);
    });
    resizeObserver.observe(masonryItemRef.current.firstChild);
    return () => {
      resizeObserver.disconnect();
    };
  }, [hasDefaultHeight]);
  const handleRef = (0, _utils.unstable_useForkRef)(ref, masonryItemRef);
  const theme = (0, _styles.useTheme)();
  const styleProp = {};

  if (!Array.isArray(spacing) && typeof spacing !== 'object') {
    const gap = height ? Number(theme.spacing(spacing).replace('px', '')) : 0;
    const rowSpan = height ? Math.ceil((height + gap) / 2) : 2;
    styleProp.gridRowEnd = `span ${rowSpan}`;
    styleProp.paddingBottom = gap === 0 ? 0 : gap - 2;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MasonryItemRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    ref: handleRef,
    ownerState: ownerState,
    style: styleProp
  }, other, {
    children: React.Children.only(children)
  }));
});
process.env.NODE_ENV !== "production" ? MasonryItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component, normally an `<img />` or a `<div />`. It should be only one element.
   */
  children: _propTypes.default.element.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The number of columns taken up by the component
   * @default 1
   */
  columnSpan: _propTypes.default.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The initial height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight: _propTypes.default.number,

  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = MasonryItem;
exports.default = _default;