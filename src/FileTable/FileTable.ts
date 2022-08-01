import { ITreeNode, selectors } from "../types";
import appState from "../state.service";
import { generateNodeEl } from "../utils";
import "./style.css";

export class FileTable {
  appRightEl: HTMLElement | null;

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

    node.children?.map((node) => {
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
      fileEl.textContent = node.size + "";

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

  renderNodeTable(node: ITreeNode) {
    this.appRightEl!.innerHTML = "";
    const fileTableContainer = document.createElement("div");
    fileTableContainer.setAttribute("class", "file-table");

    const tableHeader = `
        <div class="table__row table__head">
            <div class="table__col">
                Name
            </div>
            <div class="table__col">
                Date Modified
            </div>
            <div class="table__col">
                File Size
            </div>
        </div>
    `;
    fileTableContainer.innerHTML = tableHeader;
    fileTableContainer.appendChild(this.getNodeTableDOM(node));

    this.appRightEl!.appendChild(fileTableContainer);
  }

  handleNodeClick(node: ITreeNode) {
    this.appRightEl!.querySelectorAll(".table__row").forEach((el) =>
      el.classList.remove("selected")
    );
    this.appRightEl!.querySelector(`#table_${node.name}`)!.classList.add(
      "selected"
    );
  }

  handleNodeDblClick(node: ITreeNode) {
    appState.selectedNode = node;
  }
}
