import fileIcon from "./file.svg";
import folderIcon from "./folder.svg";
import { ITreeNode } from "./types";

export function getNodeIcon(
  type: string,
  hasChildren: boolean = false
): HTMLElement {
  const nodeIconEl = document.createElement("i");
  nodeIconEl.setAttribute(
    "class",
    `tree-node__icon ${hasChildren && "tree-node--hasChildren"}`
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

export function generateNodeEl(node: ITreeNode, hasChildren: boolean = false) {
  const nodeEl = document.createElement("div");
  const nodeIconEl = getNodeIcon(
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
