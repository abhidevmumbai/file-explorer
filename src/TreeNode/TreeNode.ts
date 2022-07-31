import { ITreeNode, selectors } from "../types";

export class TreeNode {
  nodeList: ITreeNode[] = [];
  appLeftEl: HTMLElement | null;

  constructor(nodeList: ITreeNode[]) {
    this.nodeList = nodeList;
    this.appLeftEl = document.querySelector(`.${selectors.AppLeft}`);
  }

  init() {
    console.log("TreeNode init...");
    this.renderNodeList();
  }

  getNodeListHtml(list: ITreeNode[], level: number): string {
    const listHtml = list.map((node: ITreeNode) => {
      return `<ul class="level_${level}">
              <li>
                <div class="tree-node">
                  <i className="tree-node__icon">${node.type}</i>
                  <span className="tree-node__name">${node.name}</span>
                </div>
                ${
                  node.children?.length
                    ? this.getNodeListHtml(node.children, level + 1)
                    : ""
                }
              </li>
            </ul>`;
    });
    return listHtml.join("");
  }

  renderNodeList() {
    this.appLeftEl!.innerHTML = `
      ${this.getNodeListHtml(this.nodeList, 0)}  
    `;
  }
}
