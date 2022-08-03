import "./style.css";
import { generateNodeEl } from "../utils";
import appState from "../state.service";
import { ITreeNode } from "./TreeNode.types";
import { selectors } from "../main.types";
import menuRightIcon from "../images/menu-right.svg";

export class TreeNode {
  appLeftEl: HTMLElement | null;
  showFiles = true; // Flag to display files in the file tree

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
      this.setSelectedCSS(node, appState.selectedNodeLevel);
    });
  }

  getTreeDOM(list: ITreeNode[], level: number): HTMLUListElement {
    const treeDOM = document.createElement("ul");
    treeDOM.setAttribute("class", `level_${level}`);
    list.map((node: ITreeNode) => {
      if (!this.showFiles && node.type === "file") {
        return;
      }

      // li element
      const treeNodeLiEl = document.createElement("li");
      treeNodeLiEl.setAttribute("class", "tree-node");

      // node name element container
      const treeNodeEl = document.createElement("div");
      treeNodeEl.setAttribute("class", "tree-node__name");
      treeNodeEl.setAttribute("id", `tree_level_${level}_${node.name}`);

      // node name element(file/folder icon + name)
      const nodeEl = generateNodeEl(node, true);
      this.addNodeClickEventListeners(nodeEl, node, level);

      // adding expand/collapse functionality
      if (node?.children?.length) {
        const toggleCheckbox = document.createElement("input");
        toggleCheckbox.setAttribute("type", "checkbox");
        toggleCheckbox.setAttribute("id", `chk-${node.name}`);

        const label = document.createElement("label");
        label.setAttribute("for", `chk-${node.name}`);

        // Adding expand/collapse icon
        treeNodeLiEl.appendChild(toggleCheckbox);
        treeNodeLiEl.appendChild(label);
      }
      treeNodeEl.appendChild(nodeEl);
      treeNodeLiEl.appendChild(treeNodeEl);

      // node children
      const subTree =
        node.children?.length && this.getTreeDOM(node.children, level + 1);
      subTree && treeNodeLiEl.appendChild(subTree);

      treeDOM.appendChild(treeNodeLiEl);
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
    appState.selectedNodeLevel = level;
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
