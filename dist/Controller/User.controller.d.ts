import express from "express";
declare const registerUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
declare const loginUser: (req: express.Request, res: express.Response) => Promise<express.Response<any, Record<string, any>>>;
export { registerUser, loginUser };
