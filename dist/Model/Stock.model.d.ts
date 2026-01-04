import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps, {}, {}, {}, mongoose.Document<unknown, {}, {
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps, {}, {
    timestamps: true;
}> & {
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    designId: mongoose.Types.ObjectId;
    varientId: mongoose.Types.ObjectId;
    meter: number;
    unit: number;
    cutBy: mongoose.Types.ObjectId;
    fitBy: mongoose.Types.ObjectId;
    ratePerMeterWithMeter: number;
    ratePerUnitWithUnit: number;
} & mongoose.DefaultTimestampProps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default _default;
