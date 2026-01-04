import Stock from "../Model/Stock.model.js";
const getStockAnalysis = async (req, res) => {
    try {
        const { fromDate, toDate } = req.query;
        // If no dates → return all data
        let matchStage = {};
        if (fromDate && toDate) {
            const startDate = new Date(`${fromDate}T00:00:00.000Z`);
            const endDate = new Date(`${toDate}T23:59:59.999Z`);
            matchStage = {
                createdAt: { $gte: startDate, $lte: endDate },
            };
        }
        const data = await Stock.aggregate([
            { $match: matchStage },
            // Join Design
            {
                $lookup: {
                    from: "designs",
                    localField: "designId",
                    foreignField: "_id",
                    as: "design"
                }
            },
            { $unwind: "$design" },
            // Join Variant
            {
                $lookup: {
                    from: "varients",
                    localField: "varientId",
                    foreignField: "_id",
                    as: "variant"
                }
            },
            { $unwind: "$variant" },
            // Group by design + color
            {
                $group: {
                    _id: { design: "$design.name", color: "$variant.color" },
                    meter: { $sum: "$meter" },
                    unit: { $sum: "$unit" }
                }
            },
            // Group by design only
            {
                $group: {
                    _id: "$_id.design",
                    variant: {
                        $push: {
                            color: "$_id.color",
                            meter: "$meter",
                            unit: "$unit"
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    design: "$_id",
                    variant: 1
                }
            }
        ]);
        return res.json({ success: true, data });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};
export { getStockAnalysis };
