import { describe, it, expect, beforeAll, vi } from "vitest";
import { Editor } from "@tiptap/core";
import { JSDOM } from "jsdom";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import path from "path";

import MyExtension from "./index";

let dom, document;

describe("MyExtension", () => {
  beforeAll(async () => {
    dom = await JSDOM.fromFile(path.resolve(__dirname, "test.dom.html"), {
      contentType: "text/html",
    });
    document = dom.window.document;
  });

  describe("Initialization", () => {
    it("initializes without errors", () => {
      const editor = new Editor({
        element: document.querySelector("#editor"),
        content: "<p>Example Text</p>",
        extensions: [Document, Paragraph, Text, MyExtension],
      });
      expect(editor).toBeTruthy();
    });

    it("allows extension access via editor", () => {
      const editor = new Editor({
        element: document.querySelector("#editor"),
        content: "<p>Example Text</p>",
        extensions: [Document, Paragraph, Text, MyExtension],
      });

      const myExtension = editor.extensionManager.extensions.find(
        (extension) => extension.name === "MyExtension"
      );

      expect(myExtension).toBeTruthy();
    });
  });

  describe("Commands", () => {
    it("defines commands within the editor", () => {
      const editor = new Editor({
        element: document.querySelector("#editor"),
        content: "<p>Example Text</p>",
        extensions: [Document, Paragraph, Text, MyExtension],
      });

      expect(editor.commands.myCommand).toBeDefined();
    });

    it("allows command extensions to be called via editor commands", () => {
      const editor = new Editor({
        element: document.querySelector("#editor"),
        content: "<p>Example Text</p>",
        extensions: [Document, Paragraph, Text, MyExtension],
      });

      editor.commands.myCommand();

      expect(editor.getText()).toContain("My Extension");
    });
  });
});
