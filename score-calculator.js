import { doc, getDoc, updateDoc, collection, getDocs, query } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

/**
 * Calculates and updates the user's aggregate score based on exam history.
 * Aggregates all scores from 'examHistory'.
 */
export async function updateAggregateScore(uid) {
    try {
        const histRef = collection(db, "users", uid, "examHistory");
        const snapshot = await getDocs(query(histRef));
        
        if (snapshot.empty) return;

        let totalScore = 0;
        let totalMaxScore = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (typeof data.score === 'number' && typeof data.maxScore === 'number') {
                totalScore += data.score;
                totalMaxScore += data.maxScore;
            }
        });

        if (totalMaxScore === 0) return;

        // Calculate average percentage, normalized to 15 points
        const averagePercentage = (totalScore / totalMaxScore);
        const normalizedAggregate = Math.round(averagePercentage * 15);

        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            aggregateScore: normalizedAggregate
        });

        // Adaptive Goal Logic
        if (normalizedAggregate >= 14) {
            const userData = (await getDoc(userRef)).data();
            // Only upgrade if not already at the top tier
            if (userData.targetInstitution !== "Prestigious University") {
                await updateDoc(userRef, {
                    targetInstitution: "Prestigious University",
                    targetDepartment: "Advanced Engineering"
                });
            }
        }
        
    } catch (e) {
        console.error("Error updating aggregate score:", e);
    }
}
