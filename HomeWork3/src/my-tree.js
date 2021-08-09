const tmplTree = document.createElement('template');

tmplTree.innerHTML = `
  <style>
    .tree {
      background: #966F33;
      width: 15px;
      padding: 5px;
      border: 2px solid grey;
      margin: 10px 25px;
      text-align: center;
      color: yellow;
    }
  </style>
  <div class="tree">
      <slot name="treeId"></slot>
      <slot></slot>
  </div>
`;

class MyTree extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({mode: "open"});
    shadowRoot.appendChild(tmplTree.content.cloneNode(true));
    const treeElem = shadowRoot.querySelector('slot[name="treeId"]');
    treeElem.innerHTML = this.getAttribute('treeId');
  };
};

customElements.define('my-tree', MyTree);