import EventBus from "./EventBus";
import hbs from "handlebars";

import { v4 as uuidv4 } from "uuid";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  static ID_ATTRIBUTE = "data-node-id";

  _element = null;

  _meta = null;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this._id = uuidv4();

    this.children = this._getChildren(props);

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps, newProps) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps, newProps) {
    return oldProps !== newProps;
  }

  setProps(nextProps) {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  }

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, callback]) =>
      this.element.addEventListener(eventName, callback)
    );
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, callback]) =>
      this.element.removeEventListener(eventName, callback)
    );
  }

  _getChildren(props) {
    const children = Object.entries(props).reduce(
      (acc, [key, value]) =>
        value instanceof Block
          ? {
              ...acc,
              [key]: value._id
                ? value
                : {
                    // Check for id attribute of a component
                    // If its not provided - add it
                    ...value,
                    _id: uuidv4(),
                    settings: {
                      withInternalID: true,
                    },
                  },
            }
          : acc,
      {}
    );

    return children;
  }

  _render() {
    const block = this._compile();

    if (this.props?.settings?.withInternalID) {
      this.element.setAttribute(Block.ID_ATTRIBUTE, this._id);
    }

    this._removeEvents();

    this._element.innerHTML = "";
    this.element.appendChild(block);

    this._addEvents();
  }

  render() {}

  _compile() {
    const template = hbs.compile(this.render());

    const propsWithStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsWithStubs[key] = `<div ${Block.ID_ATTRIBUTE}="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("template");

    fragment.innerHTML = template(propsWithStubs);

    Object.values(this.children).map((child) => {
      const stub = fragment.content.querySelector(
        `[${Block.ID_ATTRIBUTE}="${child._id}"]`
      );

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.content;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, field) {
        if (field.startsWith("_")) {
          throw new Error("No access");
        }

        const value = target[field];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, field, value) {
        if (field.startsWith("_")) {
          throw new Error("No access");
        }

        const _prevProps = { ...target };
        target[field] = value;
        const _newProps = target;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, _prevProps, _newProps);
        return true;
      },

      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  _createDocumentElement(tagName) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = "block";
  }

  hide() {
    this.getContent().style.display = "none";
  }
}

export default Block;
