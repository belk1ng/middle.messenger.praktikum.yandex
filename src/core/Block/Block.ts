import EventBus from "../EventBus/EventBus";
import hbs from "handlebars";
import { v4 as uuidv4 } from "uuid";
import { BlockProps, BlockMeta, BlockChildren } from "./types";

// TODO: Fix types
// TODO: remove tagName ???

class Block<T extends BlockProps = BlockProps> {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  static ID_ATTRIBUTE = "data-node-id";

  _element: HTMLElement;

  _meta: BlockMeta<T>;

  _id: string;

  children: BlockChildren;

  props: T;

  eventBus: () => EventBus;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props: props as T,
    };

    this._id = uuidv4();

    this.children = this._getChildren(props as T);

    this.props = this._makePropsProxy(props as T);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
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

    Object.values(this.children).map((child) =>
      child.dispatchComponentDidMount()
    );
  }

  componentDidMount() {
    console.log("Component mounted");
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    return oldProps !== newProps;
  }

  setProps(nextProps: T) {
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
      this._element.addEventListener(eventName, callback)
    );
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, callback]) =>
      this._element.removeEventListener(eventName, callback)
    );
  }

  _getChildren(props: T) {
    const children = Object.entries(props).reduce(
      (acc, [key, value]) =>
        value instanceof Block
          ? {
              ...acc,
              [key]: value,
            }
          : acc,
      {}
    );

    return children;
  }

  _render() {
    const block = this._compile() as HTMLElement;

    if (this.props?.settings?.withInternalID) {
      this.element.setAttribute(Block.ID_ATTRIBUTE, this._id);
    }

    this._removeEvents();

    this._element = block;

    this._addEvents();
  }

  render() {}

  _compile() {
    const template = hbs.compile(this.render());

    const propsWithStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsWithStubs[key] = `<div ${Block.ID_ATTRIBUTE}="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement("div") as HTMLTemplateElement;

    fragment.innerHTML = template(propsWithStubs);

    Object.values(this.children).map((child) => {
      const stub = fragment.querySelector(
        `[${Block.ID_ATTRIBUTE}="${child._id}"]`
      );

      if (stub) {
        stub.replaceWith(child.getContent());
      }
    });

    return fragment.firstElementChild;
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: T) {
    const self = this;

    return new Proxy(props, {
      get(target: Record<string, unknown>, field: string) {
        if (field.startsWith("_")) {
          throw new Error("No access");
        }

        const value = target[field];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target: Record<string, unknown>, field: string, value: unknown) {
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
    }) as T;
  }

  _createDocumentElement(tagName: string) {
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
