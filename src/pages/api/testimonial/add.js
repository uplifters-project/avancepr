import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { firebaseConfig } from "../../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function handler(req, res) {
    const { image, name, subtext, message, username, pass } = req.body;
    if (!image || !name || !subtext || !message || !username || !pass) {
        res.status(200).json({ status: "error", message: "Please fill all the fields" });
        return;
    }

    const newTestimonial = {
        name: name,
        subtext: subtext,
        message: message,
        image: image
    }

    if (username === process.env.USERNAME && pass === process.env.PASSWORD) {
        push(ref(database, 'testimonials/'), newTestimonial);
        res.status(200).json({ status: "success", message: "Testimonial added successfully" });
    } else {
        res.status(200).json({ status: "error", message: "Incorrect password" });
    }
}