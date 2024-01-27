import "../style.css";
import { useEffect, useState } from "react";
import * as React from "react";
import Loader from "./Loader";
import Header from "./Header";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import FactList from "./FactList";

const CATEGORIES = [
  { name: "Assignments", color: "#3b82f6" },
  { name: "Office Hours", color: "#16a34a" },
  { name: "Networking", color: "#ef4444" },
  { name: "Professional Development", color: "#eab308" },
  { name: "School activities", color: "#db2777" },
  { name: "Entertainment", color: "#14b8a6" },
  { name: "Self-care", color: "#f97316" },
  { name: "Life-management", color: "#8b5cf6" },
];

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);
        let response = await fetch(`http://localhost:4000?category=${currentCategory}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        else {
          let data = await response.json()
          setFacts(data);
        }
        setIsLoading(false);
      }
      getFacts();
    },
    [currentCategory]
  );

  return (
    <div>
      {/* HEADER */}
      <Header showForm={showForm} setShowForm={setShowForm} />
      {/* use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} CATEGORIES={CATEGORIES} />
      ) : null}
      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} CATEGORIES={CATEGORIES} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} CATEGORIES={CATEGORIES} />
        )}
      </main>
    </div>
  );
}

export default App;