import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { chainPropTypes } from '@mui/utils';
import { capitalize } from '@mui/material/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import loadingButtonClasses, { getLoadingButtonUtilityClass } from './loadingButtonClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var loading = ownerState.loading,
      loadingPosition = ownerState.loadingPosition,
      classes = ownerState.classes;
  var slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && "startIconLoading".concat(capitalize(loadingPosition))],
    endIcon: [loading && "endIconLoading".concat(capitalize(loadingPosition))],
    loadingIndicator: ['loadingIndicator', loading && "loadingIndicator".concat(capitalize(loadingPosition))]
  };
  var composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
}; // TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core


var rootShouldForwardProp = function rootShouldForwardProp(prop) {
  return prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';
};

var LoadingButtonRoot = styled(Button, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return [styles.root, styles.startIconLoadingStart && _defineProperty({}, "& .".concat(loadingButtonClasses.startIconLoadingStart), styles.startIconLoadingStart), styles.endIconLoadingEnd && _defineProperty({}, "& .".concat(loadingButtonClasses.endIconLoadingEnd), styles.endIconLoadingEnd)];
  }
})(function (_ref3) {
  var ownerState = _ref3.ownerState,
      theme = _ref3.theme;
  return _extends(_defineProperty({}, "& .".concat(loadingButtonClasses.startIconLoadingStart, ", & .").concat(loadingButtonClasses.endIconLoadingEnd), {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  }), ownerState.loadingPosition === 'center' && _defineProperty({
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.short
    })
  }, "&.".concat(loadingButtonClasses.loading), {
    color: 'transparent'
  }));
});
var LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: function overridesResolver(props, styles) {
    var ownerState = props.ownerState;
    return [styles.loadingIndicator, styles["loadingIndicator".concat(capitalize(ownerState.loadingPosition))]];
  }
})(function (_ref5) {
  var theme = _ref5.theme,
      ownerState = _ref5.ownerState;
  return _extends({
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
  });
});

var LoadingIndicator = /*#__PURE__*/_jsx(CircularProgress, {
  color: "inherit",
  size: 16
});

var LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiLoadingButton'
  });

  var children = props.children,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$loading = props.loading,
      loading = _props$loading === void 0 ? false : _props$loading,
      _props$loadingIndicat = props.loadingIndicator,
      loadingIndicator = _props$loadingIndicat === void 0 ? LoadingIndicator : _props$loadingIndicat,
      _props$loadingPositio = props.loadingPosition,
      loadingPosition = _props$loadingPositio === void 0 ? 'center' : _props$loadingPositio,
      other = _objectWithoutProperties(props, ["children", "disabled", "loading", "loadingIndicator", "loadingPosition"]);

  var ownerState = _extends({}, props, {
    disabled: disabled,
    loading: loading,
    loadingIndicator: loadingIndicator,
    loadingPosition: loadingPosition
  });

  var classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/_jsxs(LoadingButtonRoot, _extends({
    disabled: disabled || loading,
    ref: ref
  }, other, {
    classes: classes,
    ownerState: ownerState,
    children: [loading && /*#__PURE__*/_jsx(LoadingButtonLoadingIndicator, {
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the loading indicator is shown.
   * @default false
   */
  loading: PropTypes.bool,

  /**
   * Element placed before the children if the button is in loading state.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator: PropTypes.node,

  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), function (props) {
    if (props.loadingPosition === 'start' && !props.startIcon) {
      return new Error("MUI: The loadingPosition=\"start\" should be used in combination with startIcon.");
    }

    if (props.loadingPosition === 'end' && !props.endIcon) {
      return new Error("MUI: The loadingPosition=\"end\" should be used in combination with endIcon.");
    }

    return null;
  }),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default LoadingButton;