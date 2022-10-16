import { model, Schema } from "mongoose";

const Role = model(
    "Role",
    new Schema({
        name: String
    })
);

export default Role;