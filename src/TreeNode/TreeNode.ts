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

    // subscribing to selected node
    appState.getSelectedNode().subscribe((node: ITreeNode) => {
      this.setSelectedCSS(node);
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
      nodeEl.setAttribute("id", `tree_level_${level}_${node.name}`);
      this.addNodeClickEventListeners(nodeEl, node, level);

      treeNodeEl.appendChild(nodeEl);

      // children
      const subTree =
        node.children?.length && this.getTreeDOM(node.children, level + 1);
      subTree && treeNodeEl.appendChild(subTree);

      treeDOM.appendChild(treeNodeEl);
    });
    return treeDOM;
  }

  addNodeClickEventListeners(
    nodeEl: HTMLDivElement,
    node: ITreeNode,
    level: number
  ) {
    // adding click event listener on each node
    nodeEl.addEventListener(
      "click",
      (_event) => {
        this.handleNodeClick(node, level);
      },
      false
    );
  }

  renderNodeList(nodeList: ITreeNode[]) {
    const fileTreeContainer = document.createElement("div");
    fileTreeContainer.setAttribute("class", "file-tree");
    fileTreeContainer.appendChild(this.getTreeDOM(nodeList, 0));

    this.appLeftEl!.appendChild(fileTreeContainer);
  }

  handleNodeClick(node: ITreeNode, level = 0) {
    appState.selectedNode = node;
    this.setSelectedCSS(node, level);
  }

  setSelectedCSS(node: ITreeNode, level = 0) {
    this.appLeftEl!.querySelectorAll(".tree-node > div").forEach((el) =>
      el.classList.remove("selected")
    );
    this.appLeftEl!.querySelector(
      `#tree_level_${level}_${node.name}`
    )?.classList.add("selected");
  }
}
