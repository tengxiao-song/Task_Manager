import React, { useState } from "react";

function NewFactForm(props) {
    const [text, setText] = useState("");
    const [source, setSource] = useState("");
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const textLength = text.length;

    async function handleSubmit(e) {
        e.preventDefault();
        if (text && category && textLength <= 200) {
            setIsUploading(true);
            let newFact = { text: text, category: category, source: source };
            try {
                const response = await fetch('http://localhost:4000/addFact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', //don't delete
                    },
                    body: JSON.stringify(newFact),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } else {
                    newFact = await response.json();
                    props.setFacts((facts) => [newFact[0], ...facts]);
                }
            } catch (error) {
                console.error('Error adding fact:', error);
            }
            setIsUploading(false);

            setText("");
            setSource("");
            setCategory("");
            props.setShowForm(false);
        }
    }

    return (
        <form className="fact-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Today I need to finish..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={isUploading}
            />
            <span>{200 - text.length}</span>
            <input
                value={source}
                type="text"
                placeholder="Related link"
                onChange={(e) => setSource(e.target.value)}
                disabled={isUploading}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={isUploading}
            >
                <option value="">Choose a category:</option>
                {props.CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                        {cat.name.toUpperCase()}
                    </option>
                ))}
            </select>
            <button className="btn btn-large" disabled={isUploading}>
                Post
            </button>
        </form>
    );
}

export default NewFactForm