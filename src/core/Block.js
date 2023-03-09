import EventBus from "./EventBus";

class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element = null;
  _meta = null;

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

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

  _render() {
    const block = this.render();

    this._removeEvents();
    this.element.innerHTML = block;
    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    const self = this;

    return new Proxy(props, {
      get(target, field) {
        if (field.startsWith("_")) {
          throw new Error("Нет доступа");
        }

        const value = target[field];
        return typeof value === "function" ? value.bind(target) : value;
      },

      set(target, field, value) {
        if (field.startsWith("_")) {
          throw new Error("Нет доступа");
        }

        const _prevProps = { ...target };
        target[field] = value;
        const _newProps = target;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, _prevProps, _newProps);
        return true;
      },

      deleteProperty() {
        throw new Error("Нет доступа");
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
