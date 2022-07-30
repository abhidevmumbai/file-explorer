# file-explorer

File explorer UI using Typescript

## Run the application

`npm install`

`npm run dev`

### Problem statement

A customer has asked you for a way to provide a UI for exploring a file system with the ability to
see directories and the files within them. They would like a sidebar (on the left) with the directory
tree and a table (on the right) that shows the files within the directory.

### Acceptance criteria

1. The component should be divided into two panes and display a folder tree in the left
   pane and a file/folder list in the right pane (see mockup below).
2. It should be possible to expand/collapse folders in the folder tree.
3. It should be possible to select a folder in the left or right pane and display the contents of
   the folder in the right pane.
4. Provide getters/setters for nodes in this format:

```
interface ITreeNode {
    type: 'file' | 'folder';
    name: string;
    modified: Date;
    size: number;
    children?: ITreeNode[]
}
```
