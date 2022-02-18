import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUnarySpacing, getValue, handleBreakpoints, unstable_resolveBreakpointValues as resolveBreakpointValues } from '@mui/system';
import { deepmerge, unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps } from '@mui/material/styles';
import { getMasonryUtilityClass } from './masonryClasses';
import MasonryContext from './MasonryContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getMasonryUtilityClass, classes);
};

export var style = function style(_ref) {
  var ownerState = _ref.ownerState,
      theme = _ref.theme;
  var styles = {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    overflow: 'auto',
    width: '100%',
    rowGap: 2,
    boxSizing: 'border-box'
  };
  var base = {};
  Object.keys(theme.breakpoints.values).forEach(function (breakpoint) {
    if (ownerState.spacing[breakpoint] != null) {
      base[breakpoint] = true;
    }
  });
  var spacingValues = resolveBreakpointValues({
    values: ownerState.spacing,
    base: base
  });
  var transformer = createUnarySpacing(theme);

  var spacingStyleFromPropValue = function spacingStyleFromPropValue(propValue) {
    return {
      columnGap: getValue(transformer, propValue)
    };
  };

  styles = _extends({}, styles, handleBreakpoints({
    theme: theme
  }, spacingValues, spacingStyleFromPropValue));
  var columnValues = resolveBreakpointValues({
    values: ownerState.columns,
    base: base
  });

  var columnStyleFromPropValue = function columnStyleFromPropValue(propValue) {
    return {
      gridTemplateColumns: "repeat(".concat(propValue, ", 1fr)")
    };
  };

  styles = deepmerge(styles, handleBreakpoints({
    theme: theme
  }, columnValues, columnStyleFromPropValue));
  return styles;
};
var MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return [styles.root];
  }
})(style);
var Masonry = /*#__PURE__*/React.forwardRef(function Masonry(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry'
  });
  var masonryRef = React.useRef();

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$columns = props.columns,
      columns = _props$columns === void 0 ? 4 : _props$columns,
      _props$spacing = props.spacing,
      spacing = _props$spacing === void 0 ? 1 : _props$spacing,
      other = _objectWithoutProperties(props, ["children", "className", "component", "columns", "spacing"]);

  var ownerState = _extends({}, props, {
    spacing: spacing,
    columns: columns
  });

  var classes = useUtilityClasses(ownerState);
  var contextValue = React.useMemo(function () {
    return {
      spacing: spacing
    };
  }, [spacing]);
  var didWarn = false;
  React.useEffect(function () {
    // scroller always appears when masonry's height goes beyond 2,000px on Chrome
    var handleScroll = function handleScroll() {
      if (masonryRef.current.clientHeight === 1998 && !didWarn) {
        console.warn(['MUI: The Masonry can have the maximum height of 2,000px on Chrome browser.', 'Items that go beyond this height fail to be rendered on Chrome browser.', 'You can find more in this open issue: https://github.com/mui-org/material-ui/issues/27934'].join('\n')); // eslint-disable-next-line react-hooks/exhaustive-deps

        didWarn = true;
      }
    };

    var container = masonryRef.current;
    container.addEventListener('scroll', handleScroll);
    return function () {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);
  var handleRef = useForkRef(ref, masonryRef);
  return /*#__PURE__*/_jsx(MasonryContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/_jsx(MasonryRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
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
  children: PropTypes
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Number of columns.
   * @default 4
   */
  columns: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * Defines the space between children. It is a factor of the theme's spacing.
   * @default 1
   */
  spacing: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])), PropTypes.number, PropTypes.object, PropTypes.string]),

  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default Masonry;