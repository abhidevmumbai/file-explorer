import { ITreeNode, selectors } from "../types";

export class TreeNode {
  nodeList: ITreeNode[] = [];
  appLeftEl: HTMLElement | null;
  fileTreeEl: HTMLElement | null;

  constructor(nodeList: ITreeNode[]) {
    this.nodeList = nodeList;
    this.appLeftEl = document.querySelector(`.${selectors.AppLeft}`);
  }

  init() {
    console.log("TreeNode init...");
    this.renderNodeList();
    this.fileTreeEl = document.querySelector(`.${selectors.TreeNode}`);
    // this.setupEventListeners();
  }

  setupEventListeners() {
    this.fileTreeEl!.addEventListener("click", (event) => {
      console.log(event.target);
    });
  }

  getNodeListHtml(list: ITreeNode[], level: number): HTMLUListElement {
    const treeEl = document.createElement("ul");
    treeEl.setAttribute("class", `level_${level}`);
    list.map((node: ITreeNode) => {
      const treeNodeEl = document.createElement("li");
      treeNodeEl.setAttribute("class", "tree-node");

      const nodeEl = document.createElement("div");

      const nodeIconEl = document.createElement("i");
      nodeIconEl.setAttribute("class", "tree-node__icon");
      nodeIconEl.textContent = node.type;

      const nodeNameEl = document.createElement("span");
      nodeNameEl.setAttribute("class", "tree-node__name");
      nodeNameEl.textContent = node.name;

      nodeEl.appendChild(nodeIconEl);
      nodeEl.appendChild(nodeNameEl);

      treeNodeEl.appendChild(nodeEl);

      const subTree =
        node.children?.length && this.getNodeListHtml(node.children, level + 1);
      subTree && treeNodeEl.appendChild(subTree);

      nodeEl.addEventListener(
        "click",
        (event) => {
          this.handleNodeClick(node);
        },
        false
      );

      treeEl.appendChild(treeNodeEl);
    });
    return treeEl;
  }

  renderNodeList() {
    const treeNode = document.createElement("div");
    treeNode.setAttribute("class", "tree-node");
    treeNode.appendChild(this.getNodeListHtml(this.nodeList, 0));

    this.appLeftEl!.appendChild(treeNode);
  }

  handleNodeClick(node: ITreeNode) {
    console.log(node);
  }
}
