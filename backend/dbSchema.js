const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB);

const schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: "",
  },
});

const urlSchema = new schema(
  {
    userId: schema.Types.ObjectId,
    customUrl: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    clickDetails: [
      {
        timestamp: {
          type: Number,
        },
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        phoneNumber: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
const Url = model("Url", urlSchema);

module.exports = {
  User,
  Url,
};
