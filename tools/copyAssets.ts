import * as shell from "shelljs"; // Importing the shelljs library for shell commands

// Copy all the view templates from src/views to dist/src
shell.cp( "-R", "src/views", "dist/src");
