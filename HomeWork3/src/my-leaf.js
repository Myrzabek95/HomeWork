const tmplLeaf = document.createElement('template');

tmplLeaf.innerHTML = `
  <style>  
    .leaf {
      position: relative;
      background: #526E2A;
      width: 15px;
      height: 25px;
      padding: 5px;
      border: 2px solid grey;
      margin: 5px 15px;
      border-radius: 0 15px 5px 15px;
      text-align: center;
      color: white;
    }
  </style>
  <div class="leaf"></div>
`;

class MyLeaf extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.appendChild(tmplLeaf.content.cloneNode(true));
    const leafElem = shadowRoot.querySelector('.leaf');
    leafElem.innerHTML = this.getAttribute('leafId');
  };
};

customElements.define('my-leaf', MyLeaf);