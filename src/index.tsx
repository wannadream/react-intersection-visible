import { useEffect, useRef } from "react";

interface IntersectionVisibleProps {
  /** Enable/disable the component */
  active?: boolean;

  /** Class passed to the wrapper */
  className?: string;

  /**
   * Gets called when the wrapped component is visible
   *
   * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
   */
  onHide?: (entries: IntersectionObserverEntry[]) => void;

  /**
   * Gets called when wrapped component interesects
   *
   * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
   */
  onIntersect?: (entries: IntersectionObserverEntry[]) => void;

  /**
   * Gets called when the wrapped component is visible
   *
   * @param {IntersectionObserverEntry} entries - <a href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry">Read more...</a>
   */
  onShow?: (entries: IntersectionObserverEntry[]) => void;

  /**
   * Options passed to configure the listener
   */
  options?: {
    /** The element that is used as the viewport for checking visiblity of the target. Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null. */
    root?: any;

    /**
     * Margin around the root. Can have values similar to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right, bottom, left). The values can be percentages. This set of values serves to grow or shrink each side of the root element's bounding box before computing intersections. Defaults to all zeros.
     */
    rootMargin?: string;
    /**
     * Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. If you want the callback run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1]. The default is 0 (meaning as soon as even one pixel is visible, the callback will be run). A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
     */
    threshold?: number | number[];
  };
  /**
   * Ratio of visibility, which triggers onShow() event handler.
   */
  ratioOfOnShow?: number;
}

/**
 * Track the visitibity of the wrapped components
 *
 * <br>
 * [![codecov](https://codecov.io/gh/AvraamMavridis/react-intersection-visible/branch/master/graph/badge.svg)](https://codecov.io/gh/AvraamMavridis/react-intersection-visible) [![Build Status](https://travis-ci.org/AvraamMavridis/react-intersection-visible.svg?branch=master)](https://travis-ci.org/AvraamMavridis/react-intersection-visible) [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/react-intersection-visible.svg)](https://greenkeeper.io/)
 * <br>
 *
 * @export
 * @class IntersectionVisible
 * @extends {Component}
 */
const IntersectionVisible: React.FC<IntersectionVisibleProps> = (props) => {
  /**
   * Start the observer when the component is mounted
   */
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(handleObserverUpdate, props.options)
  );
  const node = useRef<HTMLDivElement>(null);
  let { active } = props;
  if (typeof active === "undefined") active = true;

  useEffect(() => {
    if (active) {
      startObserving();
    }

    const obs = observer.current;

    return () => {
      /**
       * Stop the observer on unmounting
       */
      obs.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    /**
     * Update observer state on prop changes
     */
    if (active) {
      startObserving();
    } else {
      stopObserving();
    }
  }, [active]);

  /**
   * Handles the visibility changes
   *
   * @param {array} entries
   */
  function handleObserverUpdate(entries: IntersectionObserverEntry[]) {
    const { onIntersect, onShow, onHide, ratioOfOnShow } = props;
    const { intersectionRect, intersectionRatio } = entries[0];
    const { top, left, bottom, right } = intersectionRect;

    if ([top, bottom, left, right].some(Boolean) && onShow) {
      if (intersectionRatio > (ratioOfOnShow || 0)) onShow(entries);
    } else if (onHide) {
      onHide(entries);
    }

    if (onIntersect) onIntersect(entries);
  }

  /**
   * Starts the observer
   */
  function startObserving() {
    if (node.current) observer.current?.observe(node.current);
  }

  /**
   * Stops the observer
   */
  function stopObserving() {
    if (node.current) observer.current?.unobserve(node.current);
  }

  /**
   * Render component
   *
   * @returns {JSX.Element}
   */
  const { className } = props;
  return (
    <div className={className || "intersection-visible-wrapper"} ref={node}>
      {props.children}
    </div>
  );
};

export default IntersectionVisible;
