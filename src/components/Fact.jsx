import React, { useState } from "react";

const apiurl = "http://localhost:4000";

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
            try {
                const response = await fetch(`${apiurl}/deleteFact/${props.fact._id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            } catch (error) {
                console.error('Error deleting fact:', error);
            }

            setIsUpdating(false);
            props.setFacts((facts) => facts.filter((f) => f._id !== props.fact._id));

        } catch (error) {
            console.error("Error in handleDelete:", error);
        }
    }

    async function handleVote() {
        const id = props.fact._id;
        setIsUpdating(true);
        try {
            const response = await fetch(`http://localhost:4000/updateVotes/${id}`, {
                method: 'PATCH',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();

            props.setFacts((facts) =>
                facts.map((f) => (f._id === id ? result[0] : f))
            );

        } catch (error) {
            console.error('Error upvoting:', error);
        }
        setIsUpdating(false);
    }

    return (
        <li className="fact" key={props.fact._id}>
            <p>
                {props.fact.text}
                <a className="source" href={props.fact.source} target="_blank" rel="noreferrer">
                    {isValidHttpUrl(props.fact.source) ? "source" : null}
                </a>
            </p>

            <span
                className="tag"
                style={{
                    backgroundColor: props.CATEGORIES.find((cat) => cat.name === props.fact.category)?.color,
                }}
            >
                {props.fact.category}
            </span>
            <div className="vote-buttons">
                <button onClick={handleVote} disabled={isUpdating}>
                    🔥 {props.fact.votes}
                </button>
                <button className="delete-buttons" onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
}
export default Fact