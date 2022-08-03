import appState from "../state.service";
import { generateNodeEl, generateTableHeadEl, sortData } from "../utils";
import "./style.css";
import { ITableHeadsConfig } from "./FileTable.types";
import { ITreeNode } from "../TreeNode/TreeNode.types";
import { selectors } from "../main.types";

export class FileTable {
  appRightEl: HTMLElement | null;
  tableHeadsConfig: ITableHeadsConfig = {
    order: ["name", "modified", "size"],
    map: {
      name: { name: "Name", dir: "asc" },
      modified: { name: "Date Modified", dir: "asc" },
      size: { name: "File Size", dir: "asc" },
    },
  };

  constructor() {
    this.appRightEl = document.querySelector(`.${selectors.AppRight}`);
  }

  init() {
    console.log("File Table init...");
    // subscribing to selected node
    appState.getSelectedNode().subscribe((node: ITreeNode) => {
      this.renderNodeTable(node);
    });
  }

  getNodeTableDOM(node: ITreeNode): HTMLDivElement {
    const tableBodyEl = document.createElement("div");
    tableBodyEl.setAttribute("class", "table__body");

    node.children?.map((node: ITreeNode) => {
      const rowEl = document.createElement("div");
      rowEl.setAttribute("class", "table__row");
      rowEl.setAttribute("id", `table_${node.name}`);
      this.addNodeClickEventListeners(rowEl, node);

      const nameEl = document.createElement("div");
      nameEl.setAttribute("class", "table__col tree-node");
      const nodeEl = generateNodeEl(node);
      nameEl.appendChild(nodeEl);

      const dateEl = document.createElement("div");
      dateEl.setAttribute("class", "table__col");
      dateEl.textContent = node.modified.toString();

      const fileEl = document.createElement("div");
      fileEl.setAttribute("class", "table__col");
      fileEl.textContent = node.size ? `${node.size} KB` : "-";

      rowEl.appendChild(nameEl);
      rowEl.appendChild(dateEl);
      rowEl.appendChild(fileEl);

      tableBodyEl.appendChild(rowEl);
    });
    return tableBodyEl;
  }

  addNodeClickEventListeners(rowEl: HTMLDivElement, node: ITreeNode) {
    // adding click event listener on each node
    rowEl.addEventListener(
      "dblclick",
      (_event) => {
        this.handleNodeDblClick(node);
      },
      false
    );
    rowEl.addEventListener(
      "click",
      (_event) => {
        this.handleNodeClick(node);
      },
      false
    );
  }

  addTableHeadSortListener(headRowEl: HTMLDivElement, node: ITreeNode) {
    headRowEl.addEventListener(
      "click",
      (event: any) => {
        this.handleSort(
          node,
          event.target.dataset.sortby,
          this.tableHeadsConfig.map[event.target.dataset.sortby].dir
        );
        // toggle sort direction
        this.tableHeadsConfig.map[event.target.dataset.sortby].dir =
          this.tableHeadsConfig.map[event.target.dataset.sortby].dir === "asc"
            ? "desc"
            : "asc";
        event.target.dataset.sortdirection =
          this.tableHeadsConfig.map[event.target.dataset.sortby].dir;
      },
      false
    );
  }

  handleSort(node: ITreeNode, sortBy: string, sortDirection: string) {
    if (!node.children?.length) {
      return;
    }
    node.children = sortData(node.children, sortBy, sortDirection);
    this.renderNodeTable(node);
  }

  renderNodeTable(node: ITreeNode) {
    this.appRightEl!.innerHTML = "";
    const fileTableContainer = document.createElement("div");
    fileTableContainer.setAttribute("class", "file-table");

    const tableHeader = generateTableHeadEl(this.tableHeadsConfig);
    this.addTableHeadSortListener(tableHeader, node);
    fileTableContainer.appendChild(tableHeader);
    fileTableContainer.appendChild(this.getNodeTableDOM(node));

    this.appRightEl!.appendChild(fileTableContainer);
  }

  handleNodeClick(node: ITreeNode) {
    this.appRightEl!.querySelectorAll(".table__row").forEach((el) =>
      el.classList.remove("selected")
    );
    this.appRightEl!.querySelector(`#table_${node.name}`)?.classList.add(
      "selected"
    );
  }

  handleNodeDblClick(node: ITreeNode) {
    // Incrementing the tree level here we are going a level deep
    appState.selectedNodeLevel = appState.selectedNodeLevel + 1;
    appState.selectedNode = node;
  }
}
