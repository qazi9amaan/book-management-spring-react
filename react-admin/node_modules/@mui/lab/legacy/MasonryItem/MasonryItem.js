import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUnarySpacing, getValue, handleBreakpoints, unstable_resolveBreakpointValues as resolveBreakpointValues } from '@mui/system';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/core';
import { styled, useThemeProps, useTheme } from '@mui/material/styles';
import { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(ownerState) {
  var classes = ownerState.classes;
  var slots = {
    root: ['root']
  };
  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

export var style = function style(_ref) {
  var ownerState = _ref.ownerState,
      theme = _ref.theme;
  var styles = {
    width: '100%',
    '& > *': _extends({
      // all contents should have a width of 100%
      width: '100%',
      boxSizing: 'inherit'
    }, ownerState.hasDefaultHeight && {
      height: '100%'
    }),
    visibility: ownerState.height ? 'visible' : 'hidden',
    gridColumnEnd: "span ".concat(ownerState.columnSpan),
    boxSizing: 'inherit'
  };

  if (Array.isArray(ownerState.spacing) || _typeof(ownerState.spacing) === 'object') {
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

    var styleFromPropValue = function styleFromPropValue(propValue) {
      var gap = ownerState.height ? Number(getValue(transformer, propValue).replace('px', '')) : 0; // For lazy-loaded images to load properly, masonry item should take up space greater than 1px.
      // Taking into account a row gap of 2px, rowSpan should at least be 2.

      var rowSpan = ownerState.height ? Math.ceil((ownerState.height + gap) / 2) : 2;
      return {
        gridRowEnd: "span ".concat(rowSpan),
        paddingBottom: gap === 0 ? 0 : gap - 2
      };
    };

    styles = _extends({}, styles, handleBreakpoints({
      theme: theme
    }, spacingValues, styleFromPropValue));
  }

  return styles;
};
var MasonryItemRoot = styled('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    return [styles.root];
  }
})(style);
var MasonryItem = /*#__PURE__*/React.forwardRef(function MasonryItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMasonryItem'
  });
  var masonryItemRef = React.useRef(null);

  var _React$useContext = React.useContext(MasonryContext),
      _React$useContext$spa = _React$useContext.spacing,
      spacing = _React$useContext$spa === void 0 ? 1 : _React$useContext$spa;

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$columnSpan = props.columnSpan,
      columnSpan = _props$columnSpan === void 0 ? 1 : _props$columnSpan,
      defaultHeight = props.defaultHeight,
      other = _objectWithoutProperties(props, ["children", "className", "component", "columnSpan", "defaultHeight"]);

  var hasDefaultHeight = defaultHeight !== undefined;

  var _React$useState = React.useState(defaultHeight),
      height = _React$useState[0],
      setHeight = _React$useState[1];

  var ownerState = _extends({}, props, {
    spacing: spacing,
    hasDefaultHeight: hasDefaultHeight,
    columnSpan: columnSpan,
    height: height < 0 ? 0 : height // MasonryItems to which negative or zero height is passed will be hidden

  });

  var classes = useUtilityClasses(ownerState);
  React.useEffect(function () {
    // Do not create a resize observer in case of provided height masonry
    if (hasDefaultHeight) {
      return undefined;
    }

    if (typeof ResizeObserver === 'undefined') {
      return undefined;
    }

    var resizeObserver = new ResizeObserver(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 1),
          item = _ref3[0];

      setHeight(item.contentRect.height);
    });
    resizeObserver.observe(masonryItemRef.current.firstChild);
    return function () {
      resizeObserver.disconnect();
    };
  }, [hasDefaultHeight]);
  var handleRef = useForkRef(ref, masonryItemRef);
  var theme = useTheme();
  var styleProp = {};

  if (!Array.isArray(spacing) && _typeof(spacing) !== 'object') {
    var gap = height ? Number(theme.spacing(spacing).replace('px', '')) : 0;
    var rowSpan = height ? Math.ceil((height + gap) / 2) : 2;
    styleProp.gridRowEnd = "span ".concat(rowSpan);
    styleProp.paddingBottom = gap === 0 ? 0 : gap - 2;
  }

  return /*#__PURE__*/_jsx(MasonryItemRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
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
  children: PropTypes.element.isRequired,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The number of columns taken up by the component
   * @default 1
   */
  columnSpan: PropTypes.number,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * The initial height of the component in px. This is provided for server-side rendering.
   */
  defaultHeight: PropTypes.number,

  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default MasonryItem;