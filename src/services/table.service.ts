import { getReport, getDataCount } from "./database.service";

export const fetchDataCount = async () => {
    return await getDataCount();
}

export const fetchReport = async (offset: number, limit: number) => {
    return await getReport(offset, limit);
}
