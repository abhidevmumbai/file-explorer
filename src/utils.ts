import fileIcon from "./file.svg";
import { ITableHeadsConfig } from "./FileTable/FileTable.types";
import folderIcon from "./folder.svg";
import { ITreeNode } from "./TreeNode/TreeNode.types";

export function getIconByNodeType(
  type: string,
  hasChildren = false
): HTMLElement {
  const nodeIconEl = document.createElement("i");
  nodeIconEl.setAttribute(
    "class",
    `tree-node__icon ${hasChildren ? "tree-node--hasChildren" : ""}`
  );
  const iconEl = document.createElement("img");
  switch (type) {
    case "file":
      iconEl.setAttribute("src", fileIcon);
      break;

    case "folder":
      iconEl.setAttribute("src", folderIcon);
      break;

    default:
      break;
  }
  nodeIconEl.appendChild(iconEl);
  return nodeIconEl;
}

export function generateNodeEl(node: ITreeNode, hasChildren = false) {
  const nodeEl = document.createElement("div");
  const nodeIconEl = getIconByNodeType(
    node.type,
    hasChildren && !!node?.children?.length
  );
  const nodeNameEl = document.createElement("span");
  nodeNameEl.setAttribute("class", "tree-node__name");
  nodeNameEl.textContent = node.name;
  nodeEl.appendChild(nodeIconEl);
  nodeEl.appendChild(nodeNameEl);
  return nodeEl;
}

export function generateTableHeadEl(tableHeadsConfig: ITableHeadsConfig) {
  const row = document.createElement("div");
  row.setAttribute("class", "table__row table__head");
  tableHeadsConfig.order.map((col) => {
    const columnEl = document.createElement("div");
    columnEl.setAttribute("class", "table__col");
    columnEl.setAttribute("data-sortby", col);
    columnEl.textContent = tableHeadsConfig.map[col].name;
    row.appendChild(columnEl);
  });
  return row;
}
