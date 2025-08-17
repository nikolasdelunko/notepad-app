import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!/^\d+$/.test(id)) {
    return res.status(400).json({
      success: false,
      message: "ID must be a number",
    });
  }

  const filename = `note_${id}.json`;
  const filePath = path.join(__dirname, "files_notes", filename);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);

    res.status(200).json({
      success: true,
      message: `Note with ID ${id} deleted successfully`,
    });
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({
        success: false,
        message: `Note with ID ${id} not found`,
      });
    }

    console.error(`Error deleting note ${id}:`, error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
