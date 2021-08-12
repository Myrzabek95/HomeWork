require('./my-tree');
require('./my-leaf');

const tree = require('../tree.json');

function createTree(tree, elem) {
  
  if(tree.items) {
    const mytree = document.createElement('my-tree');
    mytree.setAttribute('treeId', tree.id);
    elem.appendChild(mytree);

    tree.items.forEach((item) => {createTree(item, mytree)});
  } else {
    const leaf = document.createElement('my-leaf');
    leaf.setAttribute('leafId', tree.id);
    elem.appendChild(leaf);
  };
};

createTree(tree, root);