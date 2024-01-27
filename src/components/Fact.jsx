import React, { useState } from "react";
import supabase from "../supabase";

function Fact(props) {
    const [isUpdating, setIsUpdating] = useState(false);

    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    async function handleDelete() {
        try {
            setIsUpdating(true);

            if (!props.fact) {
                console.error("Fact object is null or undefined");
                return;
            }

            // Delete the fact from Supabase
            const { error } = await supabase.from("facts").delete().eq("id", props.fact.id);

            setIsUpdating(false);

            console.log("Deletion Error:", error);

            if (!error) {
                // Update the UI by removing the deleted fact
                props.setFacts((facts) => facts.filter((f) => f.id !== props.fact.id));
            }
        } catch (error) {
            console.error("Error in handleDelete:", error);
        }
    }

    async function handleVote() {
        setIsUpdating(true);
        const { data: updatedFact, error } = await supabase
            .from("facts")
            .update({ ["votesInteresting"]: props.fact["votesInteresting"] + 1 })
            .eq("id", props.fact.id)
            .select();
        setIsUpdating(false);
        console.log(updatedFact);
        if (!error)
            props.setFacts((facts) =>
                facts.map((f) => (f.id === props.fact.id ? updatedFact[0] : f))
            );
    }

    return (
        <li className="fact" key={props.fact.id}>
            <p>
                {props.fact.text}
                <a className="source" href={props.fact.source} target="_blank" rel="noreferrer">
                    {isValidHttpUrl(props.fact.source) ? "source" : null}
                </a>
            </p>

            <span
                className="tag"
                style={{
                    backgroundColor: props.CATEGORIES.find((cat) => cat.name === props.fact.category)
                        .color,
                }}
            >
                {props.fact.category}
            </span>
            <div className="vote-buttons">
                <button onClick={handleVote} disabled={isUpdating}>
                    👍 {props.fact.votesInteresting}
                </button>
                <button className="delete-buttons" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
}
export default Fact