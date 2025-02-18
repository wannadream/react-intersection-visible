# react-intersection-visible
HOC-wrapper Component that helps you track when an element enters in the viewport. It uses the new [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
with polyfill fallback

[Demo](http://avraammavridis.github.io/react-intersection-visible/)

[![Build Status](https://travis-ci.org/AvraamMavridis/react-intersection-visible.svg?branch=master)](https://travis-ci.org/AvraamMavridis/react-intersection-visible) [![Greenkeeper badge](https://badges.greenkeeper.io/AvraamMavridis/react-intersection-visible.svg)](https://greenkeeper.io/)

### How to use

1. Import `IntersectionVisible` hoc component
2. Wrap your main component with the `IntersectionVisible`
3. Provide the options and callbacks you want
4. Customize ratio of visibility for triggering onShow() event handler



### Example


```javascript
import React, { Component }   from 'react';
import ReactDOM               from 'react-dom';
import IntersectionVisible    from 'react-intersection-visible';

class YourComponent extends Component
{

    onHide( entries )
    {
        // do something
    }

    onShow( entries )
    {
        // do something
    }

    onIntersect( entries )
    {
        // do something
    }

    render(){
        return (<IntersectionVisible onIntersect={ e => this.onIntersect( e ) }
                                     onHide={ e => this.onHide( e ) }
                                     onShow={ e => this.onShow( e ) }
                                     ratioOfOnShow={75}>
                    <div>
                        blah blah blah  blah blah blah  blah blah blah  blah blah
                          blah blah blah  blah blah blah  blah blah blah
                    </div>
                </IntersectionVisible>);
    }
}

  ```

### Options:

| Name        | Description
| ------------- |-------------:|
| onIntersect    | Function that is called when the visibility status of the element change  |
| onHide    | Function that is called when the element becomes invisible |
| onShow    | Function that is called when the element becomes visible  |
| options    | Object, with the extras options supported by the IntersectionObserver API (root, rootMargin, threshold)|
| ratioOfOnShow    | Number, customize the ratio of element visibility for triggering onShow() event handler.

More about the options [here](https://developers.google.com/web/updates/2016/04/intersectionobserver?hl=en)

### Contribute

Any pull-request is more than welcome :boom: :smile:

### License

MIT

