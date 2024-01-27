import React, { useState } from "react";
import supabase from "../supabase";

function NewFactForm(props) {
    const [text, setText] = useState("");
    const [source, setSource] = useState("");
    const [category, setCategory] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const textLength = text.length;

    async function handleSubmit(e) {
        //1.provent browswer reload
        e.preventDefault();
        console.log(text, source, category);
        //2.Chekc if data is valid. If so, create a new fact
        if (text && category && textLength <= 200) {
            //3.create a new fact Object
            // const newFact = {
            //   id: Math.round(Math.random() * 1000000),
            //   text,
            //   source,
            //   category,
            //   votesInteresting: 0,
            //   votesMindblowing: 0,
            //   votesFalse: 0,
            //   createdIn: new Date().getFullYear(),
            // };

            // 3.Upload object to Supabase  and receive the new
            //fact object
            setIsUploading(true);
            const { data: newFact, error } = await supabase
                .from("facts")
                .insert([{ text, source, category }])
                .select();
            setIsUploading(false);

            //4.Add the new fact to the UI: Add the fact to state
            if (!error) props.setFacts((facts) => [newFact[0], ...facts]);
            //5.Reset the input field to empty
            setText("");
            setSource("");
            setCategory("");
            //6.Create the form
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