import "./style.css";
import { TreeNode } from "./TreeNode/TreeNode";

class App {
  appEl: HTMLElement | null;
  treeNode: any;

  constructor() {
    this.appEl = document.getElementById("app");
    this.setupLayout();
  }

  init() {
    console.log("App init...");
    this.treeNode = new TreeNode();
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
