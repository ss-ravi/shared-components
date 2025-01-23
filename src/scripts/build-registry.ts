import { promises as fs } from "fs";
import path from "path";

(async () => {
  const projectDir = process.cwd();
  const componentPath = path.resolve(
    projectDir,
    "src/components/shared/test.tsx"
  );
  const outputPath = path.resolve(projectDir, "public/r/test.json");

  try {
    const fileContent = await fs.readFile(componentPath, "utf-8");
    const jsonContent = JSON.stringify(
      {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name: "test",
        type: "registry:ui",
        author: "Ravi",
        files: [
          {
            path: "shared/test.tsx",
            content: fileContent,
            type: "registry:ui",
            target: "",
          },
        ],
      },
      null,
      2
    );
    await fs.writeFile(outputPath, jsonContent, "utf-8");
    console.log("JSON file has been saved.");
  } catch (error) {
    console.error("Error reading or writing files:", error);
  }
})();
