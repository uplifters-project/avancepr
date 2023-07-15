import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { firebaseConfig } from "../../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function handler(req, res) {
    const { image, name, username, pass } = req.body;
    if (!image || !name || !username || !pass) {
        res.status(200).json({ status: "error", message: "Please fill all the fields" });
        return;
    }
    const newNews = {
        image: image,
        name: name
    }

    if (username === process.env.USERNAME && pass === process.env.PASSWORD) {
        push(ref(database, 'clients/'), newNews);
        res.status(200).json({ status: "success", message: "Client added successfully" });
    } else {
        res.status(200).json({ status: "error", message: "Incorrect password" });
    }
}