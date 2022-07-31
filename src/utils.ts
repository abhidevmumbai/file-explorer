import fileIcon from "./file.svg";
import folderIcon from "./folder.svg";

export function getNodeIcon(
  type: string,
  hasChildren: boolean = false
): HTMLElement {
  const nodeIconEl = document.createElement("i");
  nodeIconEl.setAttribute(
    "class",
    `tree-node__icon ${hasChildren && "tree-node__hasChildren"}`
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
