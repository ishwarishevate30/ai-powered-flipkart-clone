import User from "../model/user-schema.js";

export const userSignup = async (request, response) => {
    try {
        console.log("BODY ===>", request.body);

        const {
            firstname,
            lastname,
            username,
            email,
            password,
            phone
        } = request.body;

        if (!firstname || !lastname || !username || !email || !password || !phone) {
            return response.status(400).json({
                message: "All fields are required"
            });
        }

        const exist = await User.findOne({ email }).exec();

        if (exist) {
            return response.status(409).json({
                message: "User already exists. Please use a different email." // Clear error message
            });
        }

        const newUser = new User({
            firstname,
            lastname,
            username,
            email,
            password,
            phone
        });

        console.log("Saving user to database:", newUser);
        const savedUser = await newUser.save();
        console.log("User saved successfully:", savedUser);

        return response.status(200).json({
            message: "Signup successful",
            firstname: savedUser.firstname,
            email: savedUser.email
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        response.status(500).json({
            message: error.message
        });
    }
};

export const userLogin = async (request, response) => {
    try {
        console.log("LOGIN REQUEST BODY ===>", request.body);

        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email, password }).exec();

        if (!user) {
            return response.status(401).json({
                message: "Invalid email or password"
            });
        }

        return response.status(200).json({
            message: "Login successful",
            firstname: user.firstname,
            email: user.email
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        response.status(500).json({
            message: error.message
        });
    }
};
