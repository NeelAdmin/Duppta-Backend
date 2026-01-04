import express from "express";
declare const getAllDesign: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const addDesign: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const updateDesign: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const deleteDesign: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { getAllDesign, addDesign, updateDesign, deleteDesign };
