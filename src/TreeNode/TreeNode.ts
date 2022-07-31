import { ITreeNode, selectors } from "../types";
import "./style.css";
import { getNodeIcon } from "../utils";

export class TreeNode {
  nodeList: ITreeNode[] = [];
  appLeftEl: HTMLElement | null;
  showFiles = false; // Flag to display files in the file tree

  constructor(nodeList: ITreeNode[]) {
    this.nodeList = nodeList;
    this.appLeftEl = document.querySelector(`.${selectors.AppLeft}`);
  }

  init() {
    console.log("TreeNode init...");
    this.renderNodeList();
  }

  getTreeDOM(list: ITreeNode[], level: number): HTMLUListElement {
    const treeDOM = document.createElement("ul");
    treeDOM.setAttribute("class", `level_${level}`);
    list.map((node: ITreeNode) => {
      if (!this.showFiles && node.type === "file") {
        return;
      }

      const treeNodeEl = document.createElement("li");
      treeNodeEl.setAttribute("class", "tree-node");

      const nodeEl = document.createElement("div");
      const nodeIconEl = getNodeIcon(node.type, !!node?.children?.length);
      const nodeNameEl = document.createElement("span");
      nodeNameEl.setAttribute("class", "tree-node__name");
      nodeNameEl.textContent = node.name;
      nodeEl.appendChild(nodeIconEl);
      nodeEl.appendChild(nodeNameEl);

      treeNodeEl.appendChild(nodeEl);

      // children
      const subTree =
        node.children?.length && this.getTreeDOM(node.children, level + 1);
      subTree && treeNodeEl.appendChild(subTree);

      // adding click event listener on each node
      nodeEl.addEventListener(
        "click",
        (_event) => {
          this.handleNodeClick(node);
        },
        false
      );

      treeDOM.appendChild(treeNodeEl);
    });
    return treeDOM;
  }

  renderNodeList() {
    const fileTreeContainer = document.createElement("div");
    fileTreeContainer.setAttribute("class", "file-tree");
    fileTreeContainer.appendChild(this.getTreeDOM(this.nodeList, 0));

    this.appLeftEl!.appendChild(fileTreeContainer);
  }

  handleNodeClick(node: ITreeNode) {
    console.log(node);
  }
}
