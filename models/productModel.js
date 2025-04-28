const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    user_id: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    location: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true,
        validate: {
            validator: function (desc) {
                return desc.length > 10; // <-- added return
            },
            message: "Description is too short",
        },
    },
    specification: {
        type: String,
        // required: true,
        validate: {
            validator: function (spec) {
                return spec.length > 5; // <-- added return
            },
            message: "Specification is too short",
        },
    },
    sold: {
        type: Boolean,
        default: false,
    },
    property: {
        type: Boolean,
        default: false,
    },
    liked: {
        type: Boolean,
        default: false,
    },
    stock: {
        type: Number,
    },
    image: {
        preview: { type: String, },
    },
});

module.exports = mongoose.model("Product", productSchema);
