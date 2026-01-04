import Design from "../Model/Design.model.ts";
const getAllDesign = async (req, res) => {
    try {
        const design = await Design.find();
        return res.status(200).json({ success: true, message: "Design fetched successfully", design });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
    }
};
const addDesign = async (req, res) => {
    const { name, ratePerMeter, ratePerUnit } = req.body;
    if (!name || !ratePerMeter || !ratePerUnit) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const design = await Design.create({ name, ratePerMeter, ratePerUnit });
    return res.status(201).json({ success: true, message: "Design created successfully", design });
};
const updateDesign = async (req, res) => {
    const { id, name, ratePerMeter, ratePerUnit } = req.body;
    if (!id) {
        return res.status(400).json({ message: "no design found" });
    }
    const design = await Design.findByIdAndUpdate(id, { name, ratePerMeter, ratePerUnit });
    return res.status(200).json({ success: true, message: "Design updated successfully", design });
};
const deleteDesign = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({ message: "no design found" });
    }
    const design = await Design.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Design deleted successfully", design });
};
export { getAllDesign, addDesign, updateDesign, deleteDesign };
