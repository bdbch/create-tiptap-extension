import { Extension } from "@tiptap/core";

const MyExtension = Extension.create({
  name: "MyExtension",

  // Add more extension configurations here...

  addCommands() {
    return {
      myCommand:
        () =>
        ({ commands }) => {
          return commands.insertContent("<p>My Extension</p>");
        },
      // Add more commands here...
    };
  },
});

export { MyExtension };

export default MyExtension;
