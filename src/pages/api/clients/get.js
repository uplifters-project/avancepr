import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { firebaseConfig } from "../../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function handler(req, res) {
    get(ref(database, 'clients/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                res.status(200).json({ status: "success", message: "Clients fetched successfully", data: snapshot.val() });
            } else {
                res.status(200).json({ status: "error", message: "No clients found", data: [] });
            }
        })
        .catch((error) => {
            res.status(200).json({ status: "error", message: "Error fetching news: " + error });
        });
}