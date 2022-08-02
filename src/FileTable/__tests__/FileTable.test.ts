import FileTable from "../FileTable";

describe("#App", () => {
  it("should initialize", () => {
    let fileTable = new FileTable();
    fileTable.init();
    expect(fileTable).toBeDefined();
  });

  it.todo("should fetch data");

  it.todo("should setup layout");
});
