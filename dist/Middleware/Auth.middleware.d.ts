import express from "express";
export declare const verifyJWT: (req: any, res: express.Response, next: express.NextFunction) => Promise<express.Response<any, Record<string, any>> | undefined>;
