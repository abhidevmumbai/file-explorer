import { ITreeNode, selectors } from "../types";
import "./style.css";
import { generateNodeEl } from "../utils";
import appState from "../state.service";

export class TreeNode {
  appLeftEl: HTMLElement | null;
  showFiles = false; // Flag to display files in the file tree

  constructor() {
    this.appLeftEl = document.querySelector(`.${selectors.AppLeft}`);
  }

  init() {
    console.log("TreeNode init...");
    // subscribing to node list
    appState.getNodeList().subscribe((nodeList: ITreeNode[]) => {
      this.renderNodeList(nodeList);
    });
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

      const nodeEl = generateNodeEl(node, true);
      nodeEl.setAttribute("id", `level_${level}_${node.name}`);

      treeNodeEl.appendChild(nodeEl);

      // children
      const subTree =
        node.children?.length && this.getTreeDOM(node.children, level + 1);
      subTree && treeNodeEl.appendChild(subTree);

      // adding click event listener on each node
      nodeEl.addEventListener(
        "click",
        (_event) => {
          this.handleNodeClick(node, level);
        },
        false
      );

      treeDOM.appendChild(treeNodeEl);
    });
    return treeDOM;
  }

  renderNodeList(nodeList: ITreeNode[]) {
    const fileTreeContainer = document.createElement("div");
    fileTreeContainer.setAttribute("class", "file-tree");
    fileTreeContainer.appendChild(this.getTreeDOM(nodeList, 0));

    this.appLeftEl!.appendChild(fileTreeContainer);
  }

  handleNodeClick(node: ITreeNode, level: number) {
    appState.selectedNode = node;
    document
      .querySelectorAll(".tree-node > div")
      .forEach((el) => el.classList.remove("selected"));
    document
      .querySelector(`#level_${level}_${node.name}`)!
      .classList.add("selected");
  }
}
