import express from "express";
declare const getStockAnalysis: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getStockAnalysis };
