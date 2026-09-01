import Address from "../models/Address.js";



// =================================
// ADD ADDRESS
// =================================

export const addAddress = async (req, res) => {

    try {

        const {

            fullName,

            mobile,

            addressLine,

            city,

            state,

            country,

            pincode,

            isDefault

        } = req.body;



        // Validation

        if (

            !fullName ||

            !mobile ||

            !addressLine ||

            !city ||

            !state ||

            !pincode

        ) {

            return res.status(400).json({

                success: false,

                message: "All required fields are mandatory."

            });

        }



        // If new address is default,
        // remove default from previous addresses

        if (isDefault) {

            await Address.updateMany(

                {

                    user: req.user._id

                },

                {

                    isDefault: false

                }

            );

        }



        // Create Address

        const address = await Address.create({

            user: req.user._id,

            fullName,

            mobile,

            addressLine,

            city,

            state,

            country,

            pincode,

            isDefault

        });



        res.status(201).json({

            success: true,

            message: "Address added successfully.",

            address

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =================================
// GET ALL ADDRESSES
// =================================

export const getAddresses = async (req, res) => {

    try {

        const addresses = await Address.find({

            user: req.user._id

        }).sort({

            isDefault: -1,

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            totalAddresses: addresses.length,

            addresses

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


// =================================
// UPDATE ADDRESS
// =================================

export const updateAddress = async (req, res) => {

    try {

        const address = await Address.findById(

            req.params.id

        );



        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found."

            });

        }



        // Ownership Check

        if (

            address.user.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied."

            });

        }



        const {

            fullName,

            mobile,

            addressLine,

            city,

            state,

            country,

            pincode,

            isDefault

        } = req.body;



        // If setting this address as default,
        // remove default from all other addresses

        if (isDefault) {

            await Address.updateMany(

                {

                    user: req.user._id

                },

                {

                    isDefault: false

                }

            );

        }



        address.fullName =

            fullName || address.fullName;



        address.mobile =

            mobile || address.mobile;



        address.addressLine =

            addressLine || address.addressLine;



        address.city =

            city || address.city;



        address.state =

            state || address.state;



        address.country =

            country || address.country;



        address.pincode =

            pincode || address.pincode;



        if (typeof isDefault === "boolean") {

            address.isDefault = isDefault;

        }



        await address.save();



        res.status(200).json({

            success: true,

            message: "Address updated successfully.",

            address

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// =================================
// DELETE ADDRESS
// =================================

export const deleteAddress = async (req, res) => {

    try {

        const address = await Address.findById(

            req.params.id

        );



        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found."

            });

        }



        // Ownership Check

        if (

            address.user.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied."

            });

        }



        await Address.findByIdAndDelete(

            req.params.id

        );



        res.status(200).json({

            success: true,

            message: "Address deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// =================================
// SET DEFAULT ADDRESS
// =================================

export const setDefaultAddress = async (req, res) => {

    try {

        const address = await Address.findById(

            req.params.id

        );



        if (!address) {

            return res.status(404).json({

                success: false,

                message: "Address not found."

            });

        }



        // Ownership Check

        if (

            address.user.toString() !==

            req.user._id.toString()

        ) {

            return res.status(403).json({

                success: false,

                message: "Access denied."

            });

        }



        // Remove old default

        await Address.updateMany(

            {

                user: req.user._id

            },

            {

                isDefault: false

            }

        );



        // Set new default

        address.isDefault = true;

        await address.save();



        res.status(200).json({

            success: true,

            message: "Default address updated successfully.",

            address

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

