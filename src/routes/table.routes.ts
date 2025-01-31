import express from "express";
import { fetchReport, fetchFilteredReport, fetchDataCount, fetchNonCommCount } from "../services/table.service";
import { FilterParams } from "../types/filter";
import { parseRangeFilter } from "../utils/parseFilters";
// import db from "./db"; 

const router = express.Router();
/*NOT BEING USED RIGHT NOW*/
router.get("/report", async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1; 
  const limit = parseInt(req.query.limit as string, 10) || 30; 

  const offset = limit * (page - 1);

  try {
    // Query paginated data
    const rows = await fetchReport(offset, limit);

    // Query total count
    // const totalCount = await fetchDataCount();

    const resultArray = Array.isArray(rows) ? rows : [rows];
 
    const totalCount = resultArray.length
    console.log('totalCount: ', totalCount)

    res.json({
      data: rows, // Data for the current page
      totalCount, // Total number of items in the table
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/filteredReport", async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1; // default to page 1
  const limit = parseInt(req.query.limit as string, 10) || 30; // default to 30 items per page

  const offset = limit * (page - 1);

  const filters: FilterParams = {
    property: typeof req.query.property === "string" ? req.query.property : undefined,
    utility: typeof req.query.utility === "string" ? req.query.utility : undefined,
    amr: typeof req.query.amr === "string" ? req.query.amr : undefined,
    billCycle: typeof req.query.billCycle === "string" ? req.query.billCycle : undefined,

    buildingMeterCount: parseRangeFilter(
      typeof req.query.buildingMeterCount === "string" ? req.query.buildingMeterCount : undefined
    ),
    current: parseRangeFilter(typeof req.query.current === "string" ? req.query.current : undefined),
    days4to10: parseRangeFilter(typeof req.query.days4to10 === "string" ? req.query.days4to10 : undefined),
    days10to30: parseRangeFilter(typeof req.query.days10to30 === "string" ? req.query.days10to30 : undefined),
    days30to60: parseRangeFilter(typeof req.query.days30to60 === "string" ? req.query.days30to60 : undefined),
    days60to90: parseRangeFilter(typeof req.query.days60to90 === "string" ? req.query.days60to90 : undefined),
    days90Plus: parseRangeFilter(typeof req.query.days90Plus === "string" ? req.query.days90Plus : undefined),
  };
  // console.log("current: ", filters.current)

  // console.log('AMR: ', filters.amr)


  try {
    // Query paginated data
    const rows = await fetchFilteredReport(offset, limit, filters);

    // const len = await fetchDataCount(filters)

    const resultArray = Array.isArray(rows) ? rows : [rows];

    const totalCount = resultArray.length

    // console.log('totalCount: ', totalCount)

    // Query total count
    // const totalCount = await fetchDataCount();

    res.json({
      data: rows, // Data for the current page
      totalCount, // Total number of items in the table
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/nonCommCount", async (req, res) => {
  const groupBy = req.query.groupBy;
  try{
    const rows = await fetchNonCommCount(groupBy as string);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

