import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
}, {}, mongoose.DefaultSchemaOptions> & {
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    ratePerMeter: number;
    ratePerUnit: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
