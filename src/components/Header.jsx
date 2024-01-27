import React from "react";
function Header(props) {
    const appTitle = "Today I will do";

    return (
        <header className="header">
            <div className="logo">
                <img src="logo.png" height="68" width="68" alt="Today I learned logo" />
                <h1>{appTitle}</h1>
            </div>
            <button
                className="btn btn-large btn-open"
                onClick={() => props.setShowForm((show) => !show)}
            >
                {props.showForm ? "Close" : "Create a task"}
            </button>
        </header>
    );
}
export default Header