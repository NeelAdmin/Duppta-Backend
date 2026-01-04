import express from "express";
declare const getAllVarient: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const addVarient: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteVarient: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getAllVarient, addVarient, deleteVarient };
