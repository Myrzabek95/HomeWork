import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import { MyTree} from './my-tree';
import {MyLeaf} from './my-leaf';
import tree from '../tree.json';

interface Branch{
  id: number,
  items?: Branch[]
}

function createTree(tree: Branch, elem: HTMLElement): void {
  
  if(tree.items) {
    const tr = new MyTree();
    tr.setAttribute('treeId', tree.id.toString());
    elem.appendChild(tr);

    tree.items.forEach((item) => {createTree(item, tr)});
  } else {
    const leaf = new MyLeaf();
    leaf.setAttribute('leafId', tree.id.toString());
    elem.appendChild(leaf);
  };
};

const root: HTMLElement = document.getElementById('root');

createTree(tree, root);