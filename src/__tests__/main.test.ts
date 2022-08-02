import App from "../main";

describe("#App", () => {
  it("should initialize", () => {
    let app = new App();
    app.init();
    expect(app).toBeDefined();
  });

  it.todo("should render file table");
  it.todo("should handle node single click");
  it.todo("should handle node double click");
});
