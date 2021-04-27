import { mount, ReactWrapper } from "enzyme";
import React from "react";
import Visible from "../src/index";

window.IntersectionObserver = jest.fn().mockImplementation(() => {
  return {
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  };
});

describe("<Visible />", () => {
  it("should have a wrapper div with the passed className", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible className="visible" onIntersect={onIntersect} />
    );
    const div = wrapper.find("div");
    expect(div.length).toBe(1);
    expect(div.prop("className")).toBe("visible");
  });

  it("should have an observer", () => {
    const onIntersect = jest.fn();
    const useRefSpy = jest
      .spyOn(React, "useRef")
      .mockReturnValueOnce({ current: null });
    mount(<Visible className="visible" onIntersect={onIntersect} />);
    expect(useRefSpy).toBeCalledWith(null);
  });

  it("should disconect observer onComponentUnmount", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible active={false} className="visible" onIntersect={onIntersect} />
    );
    const instance: any = wrapper.instance();
    wrapper.unmount();
    expect(instance.observer.disconnect).toHaveBeenCalled();
  });

  it("should call unobserve of the observer, when stopObserving is called", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible active={false} className="visible" onIntersect={onIntersect} />
    );
    const instance: any = wrapper.instance();
    instance.stopObserving();
    expect(instance.observer.unobserve).toHaveBeenCalled();
  });

  it("should start observing on props change if active is true", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible active={false} className="visible" onIntersect={onIntersect} />
    );
    const instance: any = wrapper.instance();
    instance.startObserving = jest.fn();
    wrapper.setProps({ active: true });
    expect(instance.startObserving).toHaveBeenCalled();
  });

  it("should stop observing on props change if active is false", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible active className="visible" onIntersect={onIntersect} />
    );
    const instance: any = wrapper.instance();
    instance.stopObserving = jest.fn();
    wrapper.setProps({ active: false });
    expect(instance.stopObserving).toHaveBeenCalled();
  });

  it("should stop observing on props change if active is false", () => {
    const onIntersect = jest.fn();
    const onShow = jest.fn();
    const wrapper = mount(
      <Visible
        active
        className="visible"
        onShow={onShow}
        onIntersect={onIntersect}
      />
    );
    const instance: any = wrapper.instance();
    instance.handleObserverUpdate([
      {
        intersectionRect: {
          top: 1,
          bottom: 1,
          left: 1,
          right: 1,
        },
      },
    ]);
    expect(onShow).toHaveBeenCalled();
  });

  it("should stop observing on props change if active is false", () => {
    const onIntersect = jest.fn();
    const onHide = jest.fn();
    const wrapper = mount(
      <Visible
        active
        className="visible"
        onHide={onHide}
        onIntersect={onIntersect}
      />
    );
    const instance: any = wrapper.instance();
    instance.handleObserverUpdate([
      {
        intersectionRect: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    ]);
    expect(onHide).toHaveBeenCalled();
  });

  it("should stop observing on props change if active is false", () => {
    const onIntersect = jest.fn();
    const wrapper = mount(
      <Visible active className="visible" onIntersect={onIntersect} />
    );
    const instance: any = wrapper.instance();
    instance.handleObserverUpdate([
      {
        intersectionRect: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    ]);
    expect(onIntersect).toHaveBeenCalled();
  });
});
