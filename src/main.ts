import "./style.css";
import { TreeNode } from "./TreeNode/TreeNode";
import { ITreeNode, selectors } from "./types";

class App {
  nodeList: ITreeNode[] = [];
  appEl: HTMLElement | null;
  appLeftEl: HTMLElement | null;
  appRightEl: HTMLElement | null;
  treeNode: any;

  constructor() {
    this.appEl = document.getElementById(selectors.App);
    this.setupLayout();
    this.appLeftEl = this.appEl!.querySelector(selectors.AppLeft);
    this.appRightEl = document.getElementById(selectors.AppRight);
  }

  async init() {
    console.log("App init...");
    this.treeNode = new TreeNode();
    this.treeNode.init(this.nodeList);
  }

  setupLayout() {
    this.appEl!.innerHTML = `
    <h1 class="app__header">File Explorer</h1>
    <div class="app__content">
      <div class="app__left"></div>
      <div class="app__right"></div>
    </div>
  `;
  }
}

const app = new App();
app.init();
