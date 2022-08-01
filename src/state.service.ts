import { ITreeNode } from "./types";
import { Observable, of, Subject } from "rxjs";

export class StateService {
  #nodeList = new Subject<ITreeNode[]>();
  #selectedNode = new Subject<ITreeNode>();
  #selectedNodeLevel = 0;

  constructor(initialState: any) {
    const { nodeList, selectedNode } = initialState;
    this.nodeList = nodeList;
    this.selectedNode = selectedNode;
  }

  set nodeList(list: ITreeNode[]) {
    this.#nodeList.next(list);
  }
  getNodeList(): Observable<ITreeNode[]> {
    return this.#nodeList.asObservable();
  }

  set selectedNode(node: ITreeNode) {
    this.#selectedNode.next(node);
  }
  getSelectedNode(): Observable<ITreeNode> {
    return this.#selectedNode.asObservable();
  }

  set selectedNodeLevel(level: number) {
    this.#selectedNodeLevel = level;
  }
  get selectedNodeLevel(): number {
    return this.#selectedNodeLevel;
  }
}

const initialState = {
  nodeList: [],
  selectedNode: null,
};
export default new StateService(initialState);
