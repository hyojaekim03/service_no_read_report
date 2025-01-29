import connection from '../db/connection';
import { FilterParams } from '../types/filter';

const TABLE1 = 'building_meter_list'
const TABLE2 = 'non_comm'

//@note - hjk - fix this later so that it gets count instead of actual data

export const getDataCount = async (filters: FilterParams) => {

  const getDataCountQuery = ` SELECT COUNT(*) AS total FROM (
    (
        SELECT 1
        FROM building_meter_list m
        LEFT JOIN non_comm n
        ON m.property = n.property
        AND m.utility = n.utility
        AND m.amr = n.amr
        WHERE 
            (m.property = ? OR ? IS NULL)
            AND (m.utility = ? OR ? IS NULL)
            AND (m.amr = ? OR ? IS NULL)
            AND (m.bill_cycle = ? OR ? IS NULL)
            AND (m.building_meter_count >= ? OR ? IS NULL)
            AND (m.building_meter_count <= ? OR ? IS NULL)
            AND (n.current >= ? OR ? IS NULL)
            AND (n.current <= ? OR ? IS NULL)
            AND (n.days_4_to_10 >= ? OR ? IS NULL)
            AND (n.days_4_to_10 <= ? OR ? IS NULL)
            AND (n.days_10_to_30 >= ? OR ? IS NULL)
            AND (n.days_10_to_30 <= ? OR ? IS NULL)
            AND (n.days_30_to_60 >= ? OR ? IS NULL)
            AND (n.days_30_to_60 <= ? OR ? IS NULL)
            AND (n.days_60_to_90 >= ? OR ? IS NULL)
            AND (n.days_60_to_90 <= ? OR ? IS NULL)
            AND (n.days_90_plus >= ? OR ? IS NULL)
    )
    UNION ALL
    (
        SELECT 1
        FROM building_meter_list m
        RIGHT JOIN non_comm n
        ON m.property = n.property
        AND m.utility = n.utility
        AND m.amr = n.amr
        WHERE 
            (m.property = ? OR ? IS NULL)
            AND (m.utility = ? OR ? IS NULL)
            AND (m.amr = ? OR ? IS NULL)
            AND (m.bill_cycle = ? OR ? IS NULL)
            AND (m.building_meter_count >= ? OR ? IS NULL)
            AND (m.building_meter_count <= ? OR ? IS NULL)
            AND (n.current >= ? OR ? IS NULL)
            AND (n.current <= ? OR ? IS NULL)
            AND (n.days_4_to_10 >= ? OR ? IS NULL)
            AND (n.days_4_to_10 <= ? OR ? IS NULL)
            AND (n.days_10_to_30 >= ? OR ? IS NULL)
            AND (n.days_10_to_30 <= ? OR ? IS NULL)
            AND (n.days_30_to_60 >= ? OR ? IS NULL)
            AND (n.days_30_to_60 <= ? OR ? IS NULL)
            AND (n.days_60_to_90 >= ? OR ? IS NULL)
            AND (n.days_60_to_90 <= ? OR ? IS NULL)
            AND (n.days_90_plus >= ? OR ? IS NULL)
    )
) AS count_table;
  `;

  const queryParams = [

    filters.property || null, filters.property || null,
    filters.utility || null, filters.utility || null,
    filters.amr || null, filters.amr || null,
    filters.billCycle || null, filters.billCycle || null,
    
    filters.buildingMeterCount?.min ?? null, filters.buildingMeterCount?.min ?? null,
    filters.buildingMeterCount?.max ?? null, filters.buildingMeterCount?.max ?? null,
  
    filters.current?.min ?? null, filters.current?.min ?? null,
    filters.current?.max ?? null, filters.current?.max ?? null,
  
    filters.days4to10?.min ?? null, filters.days4to10?.min ?? null,
    filters.days4to10?.max ?? null, filters.days4to10?.max ?? null,
  
    filters.days10to30?.min ?? null, filters.days10to30?.min ?? null,
    filters.days10to30?.max ?? null, filters.days10to30?.max ?? null,
  
    filters.days30to60?.min ?? null, filters.days30to60?.min ?? null,
    filters.days30to60?.max ?? null, filters.days30to60?.max ?? null,
  
    filters.days60to90?.min ?? null, filters.days60to90?.min ?? null,
    filters.days60to90?.max ?? null, filters.days60to90?.max ?? null,
  
    filters.days90Plus?.min ?? null, filters.days90Plus?.min ?? null,
  
    
    filters.property || null, filters.property || null,
    filters.utility || null, filters.utility || null,
    filters.amr || null, filters.amr || null,
    filters.billCycle || null, filters.billCycle || null,
    
    filters.buildingMeterCount?.min ?? null, filters.buildingMeterCount?.min ?? null,
    filters.buildingMeterCount?.max ?? null, filters.buildingMeterCount?.max ?? null,
  
    filters.current?.min ?? null, filters.current?.min ?? null,
    filters.current?.max ?? null, filters.current?.max ?? null,
  
    filters.days4to10?.min ?? null, filters.days4to10?.min ?? null,
    filters.days4to10?.max ?? null, filters.days4to10?.max ?? null,
  
    filters.days10to30?.min ?? null, filters.days10to30?.min ?? null,
    filters.days10to30?.max ?? null, filters.days10to30?.max ?? null,
  
    filters.days30to60?.min ?? null, filters.days30to60?.min ?? null,
    filters.days30to60?.max ?? null, filters.days30to60?.max ?? null,
  
    filters.days60to90?.min ?? null, filters.days60to90?.min ?? null,
    filters.days60to90?.max ?? null, filters.days60to90?.max ?? null,
  
    filters.days90Plus?.min ?? null, filters.days90Plus?.min ?? null,
  
  ];

  const [countResult] = await connection.query(getDataCountQuery, queryParams) as [Array<{ total: number }>, any];

  const totalRows = countResult[0]?.total ?? 0; 

  console.log("Total row count:", totalRows);
  return totalRows;
}

const getReportQuery = 
`SELECT * FROM ${TABLE1} LIMIT ? OFFSET ?`; 

export const getReport = async (offset: number, limit: number) => {
  const [rows] = await connection.query(getReportQuery, [limit, offset]);
  console.log('rows: ', rows)
  console.log(`rows fetched successfully from ${TABLE1}`)
  return rows;
};

export const getFilteredReport = async (
  offset: number | undefined,
  limit: number | undefined,
  filters: FilterParams
) => {
  // const safeLimit = limit ?? 10;  // Default limit if undefined
  // const safeOffset = offset ?? 0; // Default offset if undefined

  const baseQuery = `
(
    SELECT 
        m.property, 
        m.utility,
        m.amr,
        m.bill_cycle, 
        m.building_meter_count, 
        n.current,
        n.days_4_to_10,
        n.days_10_to_30, 
        n.days_30_to_60, 
        n.days_60_to_90,
        n.days_90_plus
    FROM ${TABLE1} m
    LEFT JOIN ${TABLE2} n
    ON m.property = n.property
    AND m.utility = n.utility
    AND m.amr = n.amr
    WHERE 
        (m.property = ? OR ? IS NULL)
        AND (m.utility = ? OR ? IS NULL)
        AND (m.amr = ? OR ? IS NULL)
        AND (m.bill_cycle = ? OR ? IS NULL)
        AND (m.building_meter_count >= ? OR ? IS NULL)
        AND (m.building_meter_count <= ? OR ? IS NULL)
        AND (n.current >= ? OR ? IS NULL)
        AND (n.current <= ? OR ? IS NULL)
        AND (n.days_4_to_10 >= ? OR ? IS NULL)
        AND (n.days_4_to_10 <= ? OR ? IS NULL)
        AND (n.days_10_to_30 >= ? OR ? IS NULL)
        AND (n.days_10_to_30 <= ? OR ? IS NULL)
        AND (n.days_30_to_60 >= ? OR ? IS NULL)
        AND (n.days_30_to_60 <= ? OR ? IS NULL)
        AND (n.days_60_to_90 >= ? OR ? IS NULL)
        AND (n.days_60_to_90 <= ? OR ? IS NULL)
        AND (n.days_90_plus >= ? OR ? IS NULL)
)
UNION
(
    SELECT 
        m.property, 
        m.utility,
        m.amr,
        m.bill_cycle, 
        m.building_meter_count, 
        n.current,
        n.days_4_to_10,
        n.days_10_to_30, 
        n.days_30_to_60, 
        n.days_60_to_90,
        n.days_90_plus
    FROM ${TABLE1} m
    RIGHT JOIN ${TABLE2} n
    ON m.property = n.property
    AND m.utility = n.utility
    AND m.amr = n.amr
    WHERE 
        (m.property = ? OR ? IS NULL)
        AND (m.utility = ? OR ? IS NULL)
        AND (m.amr = ? OR ? IS NULL)
        AND (m.bill_cycle = ? OR ? IS NULL)
        AND (m.building_meter_count >= ? OR ? IS NULL)
        AND (m.building_meter_count <= ? OR ? IS NULL)
        AND (n.current >= ? OR ? IS NULL)
        AND (n.current <= ? OR ? IS NULL)
        AND (n.days_4_to_10 >= ? OR ? IS NULL)
        AND (n.days_4_to_10 <= ? OR ? IS NULL)
        AND (n.days_10_to_30 >= ? OR ? IS NULL)
        AND (n.days_10_to_30 <= ? OR ? IS NULL)
        AND (n.days_30_to_60 >= ? OR ? IS NULL)
        AND (n.days_30_to_60 <= ? OR ? IS NULL)
        AND (n.days_60_to_90 >= ? OR ? IS NULL)
        AND (n.days_60_to_90 <= ? OR ? IS NULL)
        AND (n.days_90_plus >= ? OR ? IS NULL)
)
LIMIT ? OFFSET ?;

  `;

  const queryParams = [
    filters.property || null, filters.property || null,
    filters.utility || null, filters.utility || null,
    filters.amr || null, filters.amr || null,
    filters.billCycle || null, filters.billCycle || null,
    
    filters.buildingMeterCount?.min ?? null, filters.buildingMeterCount?.min ?? null,
    filters.buildingMeterCount?.max ?? null, filters.buildingMeterCount?.max ?? null,
  
    filters.current?.min ?? null, filters.current?.min ?? null,
    filters.current?.max ?? null, filters.current?.max ?? null,
  
    filters.days4to10?.min ?? null, filters.days4to10?.min ?? null,
    filters.days4to10?.max ?? null, filters.days4to10?.max ?? null,
  
    filters.days10to30?.min ?? null, filters.days10to30?.min ?? null,
    filters.days10to30?.max ?? null, filters.days10to30?.max ?? null,
  
    filters.days30to60?.min ?? null, filters.days30to60?.min ?? null,
    filters.days30to60?.max ?? null, filters.days30to60?.max ?? null,
  
    filters.days60to90?.min ?? null, filters.days60to90?.min ?? null,
    filters.days60to90?.max ?? null, filters.days60to90?.max ?? null,
  
    filters.days90Plus?.min ?? null, filters.days90Plus?.min ?? null,
  
 
    filters.property || null, filters.property || null,
    filters.utility || null, filters.utility || null,
    filters.amr || null, filters.amr || null,
    filters.billCycle || null, filters.billCycle || null,
    
    filters.buildingMeterCount?.min ?? null, filters.buildingMeterCount?.min ?? null,
    filters.buildingMeterCount?.max ?? null, filters.buildingMeterCount?.max ?? null,
  
    filters.current?.min ?? null, filters.current?.min ?? null,
    filters.current?.max ?? null, filters.current?.max ?? null,
  
    filters.days4to10?.min ?? null, filters.days4to10?.min ?? null,
    filters.days4to10?.max ?? null, filters.days4to10?.max ?? null,
  
    filters.days10to30?.min ?? null, filters.days10to30?.min ?? null,
    filters.days10to30?.max ?? null, filters.days10to30?.max ?? null,
  
    filters.days30to60?.min ?? null, filters.days30to60?.min ?? null,
    filters.days30to60?.max ?? null, filters.days30to60?.max ?? null,
  
    filters.days60to90?.min ?? null, filters.days60to90?.min ?? null,
    filters.days60to90?.max ?? null, filters.days60to90?.max ?? null,
  
    filters.days90Plus?.min ?? null, filters.days90Plus?.min ?? null,
  
    limit, offset
  ];
  

  console.log("Executing SQL Query:", baseQuery);
  console.log("With Parameters:", queryParams);

  // Execute the query
  const [rows] = await connection.query(baseQuery, queryParams);
  console.log("rows: ", rows)
  return rows;
};

export const getNonComm = async () => {
  const query = `SELECT * FROM ${TABLE2};`
  const [rows] = await connection.query(query);

  return rows;
}