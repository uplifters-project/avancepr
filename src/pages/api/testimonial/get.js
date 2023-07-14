import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push } from "firebase/database";
import { firebaseConfig } from "../../../../firebase.config";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function handler(req, res) {
    get(ref(database, 'testimonials/'))
        .then((snapshot) => {
            if (snapshot.exists()) {
                res.status(200).json({ status: "success", message: "Testimonials fetched successfully", data: snapshot.val() });
            } else {
                res.status(200).json({ status: "error", message: "No testimonials found" });
            }
        })
        .catch((error) => {
            res.status(200).json({ status: "error", message: "Error fetching testimonials: " + error });
        });
}