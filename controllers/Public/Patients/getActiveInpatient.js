import Patient from "../../../db/models/Patient.js";

const getActiveInpatient = async (req, res, next) => {
  try{ 
    const now = new Date();
    const projection = {
      _id: 1,
      firstName: 1,
      lastName: 1,
      expiresAt: 1,
      PCP: 1,
      packages: 1
    };

    const query = {
      PCP: { $ne: null },
      expiresAt: { $gte: now }
    };

    // const patients = await Patient.find(query, projection);
    const patients = await Patient.find(query, projection)
      .populate({
        path: 'packages', // Reference the 'packages' field
        model: 'MedPackages', // The MedPackage model name
        select: 'title price' // Select only 'title' and 'price' fields from MedPackage
      });

    return res.status(200).json({success: true, patients});
  }catch(err){
    return next(err);
  }
}

export default getActiveInpatient;