import { initializeApp } from "firebase/app ";
import { Database } from "firebase/database";
import { firebaseConfig } from "../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = new Database(app);

export default function handler(req, res) {
    const { image, name, subtext, message, email, pass } = req.body;
    console.log(req.body);
    database.child('testimonials').push({ "hi": "works" })
    res.status(200).json({ name: 'John Doe' })
}