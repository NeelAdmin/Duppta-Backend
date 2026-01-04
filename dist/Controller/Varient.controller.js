import Varient from "../Model/Varient.model.js";
const getAllVarient = async (req, res) => {
    try {
        const varient = await Varient.aggregate([
            {
                $lookup: {
                    from: "designs",
                    localField: "designId",
                    foreignField: "_id",
                    as: "design"
                }
            },
            { $unwind: "$design" },
            // group by design name
            {
                $group: {
                    _id: "$design.name",
                    varients: {
                        $push: {
                            _id: "$_id",
                            color: "$color"
                        }
                    }
                }
            },
            // rename _id → designName
            {
                $project: {
                    designName: "$_id",
                    varients: 1,
                    _id: 0
                }
            }
        ]);
        return res.status(200).json({
            success: true,
            message: "Varients grouped by design",
            varient
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const addVarient = async (req, res) => {
    const { designId, color } = req.body;
    if (!designId || !color) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const varient = await Varient.create({ designId, color });
    return res.status(201).json({ success: true, message: "Varient created successfully", varient });
};
const deleteVarient = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "no varient found" });
    }
    const varient = await Varient.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Varient deleted successfully", varient });
};
export { getAllVarient, addVarient, deleteVarient };
