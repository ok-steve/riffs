const template = document.createElement("template");

template.innerHTML = `
  <style>
    div {
      align-items: center;
      /* border: 1px solid; */
      background-color: var(--toast-background);
      color: var(--toast-color, white);
      display: flex;
      inset-block-end: .5em; /* Bottom */
      inset-inline-start: .5em; /* Left */
      padding: .5em;
      position: fixed;
      opacity: 0;
      transition: opacity .2s, transform .2s;
      transform: translateY(10px);
    }

    div.show {
      opacity: 1;
      transform: translateY(0);
    }

    div > * + * {
      margin-left: .25em;
    }

    button {
      background: none;
      border: none;
      color: inherit;
      font-size: 1.5em;
      cursor: pointer;
    }
  </style>

  <div>
    <output role="status"></output>
    <button tabindex="-1" aria-label="Dismiss toast">&times;</button>
  </div>
`;

class ToastElement extends HTMLElement {
  #focused;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  /**
   * Lifecyle callbacks
   */

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    ["click"].forEach((name) => {
      this.addEventListener(name, this);
    });

    if (this.form) {
      this.outputTarget.setAttribute("form", this.form);
    }
  }

  /**
   * Events
   */

  handleEvent(e) {
    this[`on${e.type}`](e);
  }

  onclick(e) {
    if (e.path[0] === this.buttonTarget) {
      this.#focused.focus();
      this.close();
    }
  }

  /**
   * Targets
   */

  get toastTarget() {
    return this.shadowRoot.querySelector("div");
  }

  get outputTarget() {
    return this.toastTarget.querySelector("output");
  }

  get buttonTarget() {
    return this.toastTarget.querySelector("button");
  }

  /**
   * Attributes
   */

  get form() {
    return this.getAttribute("form");
  }

  get timeout() {
    return +this.getAttribute("timeout") || 3000;
  }

  /**
   * Methods
   */

  open(message) {
    if (!message) return;
    clearTimeout(this._timer);
    this.#focused = document.activeElement;
    this.outputTarget.textContent = message;
    this.toastTarget.classList.toggle("show", true);
    this.buttonTarget.setAttribute("tabindex", 0);

    this._timer = setTimeout(() => {
      this.close();
    }, this.timeout);
  }

  close() {
    this.toastTarget.classList.toggle("show", false);
    this.buttonTarget.setAttribute("tabindex", -1);

    this._timer = setTimeout(() => {
      this.outputTarget.textContent = "";
      this._timer = undefined;
    }, 1000);
  }
}

customElements.define("r-toast", ToastElement);
