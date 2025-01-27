import connection from '../db/connection';

const TABLE = 'MdmReadReport'

const getDataCountQuery = `SELECT COUNT(*) AS totalCount from ${TABLE}`;

export const getDataCount = async () => {
  const totalCount = await connection.query(getDataCountQuery);
  console.log('totalCount: ', totalCount)
  return totalCount;
}

const getAdmReportQuery = `SELECT * FROM ${TABLE} LIMIT ? OFFSET ?`; 

export const getReport = async (offset: number, limit: number) => {
  const [rows] = await connection.query(getAdmReportQuery, [limit, offset]);
  console.log('rows: ', rows)
  console.log(`rows fetched successfully from ${TABLE}`)
  return rows;
};

//write query here separately

// export const createUser = async (name: string, email: string) => {
//   const [result] = await connection.query(
//     'INSERT INTO users (name, email) VALUES (?, ?)',
//     [name, email]
//   );
//   return result;
// };
