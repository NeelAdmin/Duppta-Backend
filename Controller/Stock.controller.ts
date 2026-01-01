import express from "express"
import Stock from "../Model/Stock.model.ts";
import DesignModel from "../Model/Design.model.ts";
import UserModel from "../Model/User.model.ts";


const getStock = async (req: express.Request, res: express.Response) => {
    
    const stock = await Stock.aggregate
        ([
            {
                $lookup: {
                    from: "designs",
                    let: { did: "$designId" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", { $toObjectId: "$$did" }]
                                }
                            }
                        },
                        { $project: { name: 1, ratePerUnit: 1, ratePerMeter: 1 } }
                    ],
                    as: "design"
                }
            },
            { $unwind: { path: "$design", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "varients",
                    let: { vid: "$varientId" },
                    pipeline: [
                        { $match: { $expr: { $eq: ["$_id", { $toObjectId: "$$vid" }] } } },
                        { $project: { color: 1, size: 1 } }
                    ],
                    as: "varient"
                }
            },
            { $unwind: { path: "$varient", preserveNullAndEmptyArrays: true } },

            { $project: { design: 1, varient: 1, meter: 1, unit: 1, ratePerMeterWithMeter: 1, ratePerUnitWithUnit: 1, cutBy: 1, fitBy: 1 } }
        ]
        )


    return res.status(200).json({ success: true, message: "Stock fetched successfully", stock })
}

const addStock = async (req: express.Request, res: express.Response) => {
    const { designId, varientId, meter, unit } = req.body;
    if (!designId || !varientId || !meter || !unit) {
        return res.status(400).json({ message: "All fields are reqired" })
    }

    const getDesign = await DesignModel.findById(designId);
    if (!getDesign) {
        return res.status(400).json({ message: "Design not found" });
    }
    const ratePerMeterWithMeter = getDesign.ratePerMeter * meter;
    const ratePerUnitWithUnit = getDesign.ratePerUnit * unit;
    const stock = await Stock.create({
        designId,
        varientId,
        meter,
        unit,
        ratePerMeterWithMeter,
        ratePerUnitWithUnit,
    });

    return res.status(201).json({ success: true, message: "Stock added successfully", stock })
}

const updateStock = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        const { designId, varientId, meter, unit, cutBy, fitBy } = req.body;

        if (!id) {
            return res.status(400).json({ message: "No stock found" });
        }

        if (!designId || !varientId || !meter || !unit) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (cutBy) {
            const user = await UserModel.findById(cutBy);
            if (!user) {
                return res.status(400).json({ message: "CutBy user not found" });
            }
        }

        if (fitBy) {
            const user = await UserModel.findById(fitBy);
            if (!user) {
                return res.status(400).json({ message: "FitBy user not found" });
            }
        }

        const getDesign = await DesignModel.findById(designId);
        if (!getDesign) {
            return res.status(400).json({ message: "Design not found" });
        }
        const ratePerMeterWithMeter = getDesign.ratePerMeter * meter;
        const ratePerUnitWithUnit = getDesign.ratePerUnit * unit;

        const updatePayload = {
            designId,
            varientId,
            meter,
            unit,
            ratePerMeterWithMeter,
            ratePerUnitWithUnit,
            cutBy: cutBy || null,
            fitBy: fitBy || null,
        };
        console.log({ updatePayload, id });


        const stock = await Stock.findOneAndUpdate({ _id: id }, updatePayload, {
            new: true,
        });

        console.log("esdfsdfs", stock);


        return res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            stock,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}

const deleteStock = async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "no stock found" })
    }
    const stock = await Stock.findOneAndDelete({ _id: id })
    return res.status(200).json({ success: true, message: "Stock deleted successfully", stock })
}

const getAssignedStock = async (req: express.Request, res: express.Response) => {
   try {
    const user = req.user;

    if (!user || !user._id) {
      return res.status(400).json({ message: "User not found" });
    }

    const stock = await Stock.find({
      $or: [{ cutBy: user._id }, { fitBy: user._id }],
    })
      .populate("designId")
      .populate("varientId")
      .populate("cutBy", "name email")
      .populate("fitBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Stock fetched successfully",
      stock,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export { getStock, addStock, updateStock, deleteStock , getAssignedStock }