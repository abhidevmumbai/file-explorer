import { ITreeNode } from "./types";

export class StateService {
  #nodeList: ITreeNode[] = [];
  #selectedNode: ITreeNode | undefined = undefined;

  constructor(initialState: any) {
    const { nodeList, selectedNode } = initialState;
    this.nodeList = nodeList;
    this.selectedNode = selectedNode;
  }

  set nodeList(list: ITreeNode[]) {
    this.#nodeList = list;
  }
  get nodeList() {
    return this.#nodeList;
  }

  set selectedNode(node: ITreeNode | undefined) {
    this.#selectedNode = node;
  }
  get selectedNode() {
    return this.#selectedNode;
  }
}

const initialState = {
  nodeList: [],
  selectedNode: null,
};
export default new StateService(initialState);
