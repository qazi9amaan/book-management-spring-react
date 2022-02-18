"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@mui/utils");

var _utils2 = require("@mui/material/utils");

var _core = require("@mui/core");

var _styles = require("@mui/material/styles");

var _Button = _interopRequireDefault(require("@mui/material/Button"));

var _CircularProgress = _interopRequireDefault(require("@mui/material/CircularProgress"));

var _loadingButtonClasses = _interopRequireWildcard(require("./loadingButtonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "disabled", "loading", "loadingIndicator", "loadingPosition"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const useUtilityClasses = ownerState => {
  const {
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && `startIconLoading${(0, _utils2.capitalize)(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${(0, _utils2.capitalize)(loadingPosition)}`],
    loadingIndicator: ['loadingIndicator', loading && `loadingIndicator${(0, _utils2.capitalize)(loadingPosition)}`]
  };
  const composedClasses = (0, _core.unstable_composeClasses)(slots, _loadingButtonClasses.getLoadingButtonUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
}; // TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core


const rootShouldForwardProp = prop => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';

const LoadingButtonRoot = (0, _styles.styled)(_Button.default, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root, styles.startIconLoadingStart && {
      [`& .${_loadingButtonClasses.default.startIconLoadingStart}`]: styles.startIconLoadingStart
    }, styles.endIconLoadingEnd && {
      [`& .${_loadingButtonClasses.default.endIconLoadingEnd}`]: styles.endIconLoadingEnd
    }];
  }
})(({
  ownerState,
  theme
}) => (0, _extends2.default)({
  [`& .${_loadingButtonClasses.default.startIconLoadingStart}, & .${_loadingButtonClasses.default.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  }
}, ownerState.loadingPosition === 'center' && {
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short
  }),
  [`&.${_loadingButtonClasses.default.loading}`]: {
    color: 'transparent'
  }
}));
const LoadingButtonLoadingIndicator = (0, _styles.styled)('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.loadingIndicator, styles[`loadingIndicator${(0, _utils2.capitalize)(ownerState.loadingPosition)}`]];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  position: 'absolute',
  visibility: 'visible',
  display: 'flex'
}, ownerState.loadingPosition === 'start' && {
  left: 14
}, ownerState.loadingPosition === 'center' && {
  left: '50%',
  transform: 'translate(-50%)',
  color: theme.palette.action.disabled
}, ownerState.loadingPosition === 'end' && {
  right: 14
}));
const LoadingIndicator = /*#__PURE__*/(0, _jsxRuntime.jsx)(_CircularProgress.default, {
  color: "inherit",
  size: 16
});
const LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiLoadingButton'
  });
  const {
    children,
    disabled = false,
    loading = false,
    loadingIndicator = LoadingIndicator,
    loadingPosition = 'center'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    disabled,
    loading,
    loadingIndicator,
    loadingPosition
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(LoadingButtonRoot, (0, _extends2.default)({
    disabled: disabled || loading,
    ref: ref
  }, other, {
    classes: classes,
    ownerState: ownerState,
    children: [loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(LoadingButtonLoadingIndicator, {
      className: classes.loadingIndicator,
      ownerState: ownerState,
      children: loadingIndicator
    }), children]
  }));
});
process.env.NODE_ENV !== "production" ? LoadingButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: _propTypes.default.bool,

  /**
   * Element placed before the children if the button is in loading state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: _propTypes.default.node,

  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: (0, _utils.chainPropTypes)(_propTypes.default.oneOf(['start', 'end', 'center']), props => {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error(`MUI: The loadingPosition="start" should be used in combination with startIcon.`);
    }

    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error(`MUI: The loadingPosition="end" should be used in combination with endIcon.`);
    }

    return null;
  }),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = LoadingButton;
exports.default = _default;