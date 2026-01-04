import express from "express";
declare const getStock: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const addStock: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updateStock: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteStock: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const getAssignedStock: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getStock, addStock, updateStock, deleteStock, getAssignedStock };
