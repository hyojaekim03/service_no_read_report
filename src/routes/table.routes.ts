import express from "express";
import { fetchReport, fetchDataCount } from "../services/table.service";
// import db from "./db"; // Your database connection

const router = express.Router();

router.get("/adm", async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit as string, 10) || 30; // Default to 30 items per page

  const offset = limit * (page - 1);

  try {
    // Query paginated data
    const rows = await fetchReport(offset, limit);

    // Query total count
    const totalCount = await fetchDataCount();

    res.json({
      data: rows, // Data for the current page
      totalCount, // Total number of items in the table
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

