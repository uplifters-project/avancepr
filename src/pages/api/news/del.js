import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, remove } from "firebase/database";
import { firebaseConfig } from "../../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function handler(req, res) {
    const { id, username, pass } = req.body;
    if (!id || !username || !pass) {
        res.status(200).json({ status: "error", message: "Please fill all the fields" });
        return;
    }

    if (username === process.env.USERNAME && pass === process.env.PASSWORD) {
        remove(ref(database, 'news/' + id));
        res.status(200).json({ status: "success", message: "News deleted successfully" });
    } else {
        res.status(200).json({ status: "error", message: "Incorrect password" });
    }
}