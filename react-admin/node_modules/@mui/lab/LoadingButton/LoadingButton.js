import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "disabled", "loading", "loadingIndicator", "loadingPosition"];
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

const useUtilityClasses = ownerState => {
  const {
    loading,
    loadingPosition,
    classes
  } = ownerState;
  const slots = {
    root: ['root', loading && 'loading'],
    startIcon: [loading && `startIconLoading${capitalize(loadingPosition)}`],
    endIcon: [loading && `endIconLoading${capitalize(loadingPosition)}`],
    loadingIndicator: ['loadingIndicator', loading && `loadingIndicator${capitalize(loadingPosition)}`]
  };
  const composedClasses = composeClasses(slots, getLoadingButtonUtilityClass, classes);
  return _extends({}, classes, composedClasses);
}; // TODO use `import { rootShouldForwardProp } from '../styles/styled';` once move to core


const rootShouldForwardProp = prop => prop !== 'ownerState' && prop !== 'theme' && prop !== 'sx' && prop !== 'as' && prop !== 'classes';

const LoadingButtonRoot = styled(Button, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiLoadingButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root, styles.startIconLoadingStart && {
      [`& .${loadingButtonClasses.startIconLoadingStart}`]: styles.startIconLoadingStart
    }, styles.endIconLoadingEnd && {
      [`& .${loadingButtonClasses.endIconLoadingEnd}`]: styles.endIconLoadingEnd
    }];
  }
})(({
  ownerState,
  theme
}) => _extends({
  [`& .${loadingButtonClasses.startIconLoadingStart}, & .${loadingButtonClasses.endIconLoadingEnd}`]: {
    transition: theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0
  }
}, ownerState.loadingPosition === 'center' && {
  transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
    duration: theme.transitions.duration.short
  }),
  [`&.${loadingButtonClasses.loading}`]: {
    color: 'transparent'
  }
}));
const LoadingButtonLoadingIndicator = styled('div', {
  name: 'MuiLoadingButton',
  slot: 'LoadingIndicator',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.loadingIndicator, styles[`loadingIndicator${capitalize(ownerState.loadingPosition)}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
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

const LoadingIndicator = /*#__PURE__*/_jsx(CircularProgress, {
  color: "inherit",
  size: 16
});

const LoadingButton = /*#__PURE__*/React.forwardRef(function LoadingButton(inProps, ref) {
  const props = useThemeProps({
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
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const ownerState = _extends({}, props, {
    disabled,
    loading,
    loadingIndicator,
    loadingPosition
  });

  const classes = useUtilityClasses(ownerState);
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
  loadingPosition: chainPropTypes(PropTypes.oneOf(['start', 'end', 'center']), props => {
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
  sx: PropTypes.object
} : void 0;
export default LoadingButton;