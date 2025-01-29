import { FilterParams } from "../types/filter";
import { getReport, getFilteredReport, getDataCount, getNonComm } from "./database.service";

export const fetchDataCount = async (filters: FilterParams) => {
    return await getDataCount(filters);
}

export const fetchReport = async (offset: number, limit: number) => {
    return await getReport(offset, limit);
}

export const fetchFilteredReport = async (offset: number, limit: number, filters: FilterParams) => {
    return await getFilteredReport(offset, limit, filters);
}

export const fetchNonComm = async () => {
    return await getNonComm();
}