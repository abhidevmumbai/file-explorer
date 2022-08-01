import "./style.css";
import { TreeNode } from "./TreeNode/TreeNode";
import { selectors } from "./types";
import appState from "./state.service";
import { FileTable } from "./FileTable/FileTable";

class App {
  appEl: HTMLElement | null;
  appRightEl: HTMLElement | null;
  treeNode: any;
  fileTable: any;

  constructor() {
    this.appEl = document.getElementById(selectors.App);
    this.setupLayout();
    this.appRightEl = document.getElementById(selectors.AppRight);
  }

  async init() {
    console.log("App init...");
    this.treeNode = new TreeNode();
    this.treeNode.init();

    this.fileTable = new FileTable();
    this.fileTable.init();
    await this.fetchData();
  }

  async fetchData() {
    return fetch("./public/data.json")
      .then((res) => res.json())
      .then((res) => {
        appState.nodeList = res.data;
        appState.selectedNode = res.data[0];
      });
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
