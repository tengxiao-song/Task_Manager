import React from "react";
import Fact from "./Fact";
function FactList(props) {
    if (props.facts.length === 0)
        return (
            <p className="message">
                No facts for this category yet! Create your own one 🤟
            </p>
        );

    return (
        <section>
            {" "}
            <ul className="facts-list">
                {props.facts.map((fact) => (
                    <Fact key={fact._id} fact={fact} setFacts={props.setFacts} isValidHttpUrl={props.isValidHttpUrl} CATEGORIES={props.CATEGORIES} />
                ))}
            </ul>
        </section>
    );
}
export default FactList