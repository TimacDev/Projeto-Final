import { useState, useEffect } from "react";
import BrewLogForm from "./BrewLogForm";
import CoffeeForm from "./CoffeeForm";
import BrewHistory from "./BrewHistory";
import CoffeeHistory from "./CoffeeHistory";

export default function MyCoffeeJournal() {
  const [entries, setEntries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [methods, setMethods] = useState([]);
  const [noteOptions, setNoteOptions] = useState([]);
  const [activeForm, setActiveForm] = useState("brew");

  useEffect(() => {
    fetch("/api/coffees")
      .then((r) => r.json())
      .then((data) => setCoffees(data))
      .catch(() => {});

    fetch("/api/brew-logs")
      .then((r) => r.json())
      .then((data) =>
        setEntries(
          data.map((e) => ({
            ...e,
            date: e.brewed_at
              ? new Date(e.brewed_at).toLocaleDateString()
              : "—",
          })),
        ),
      )
      .catch(() => {});

    fetch("/api/brew-logs/options")
      .then((r) => r.json())
      .then((data) => {
        setMethods(data.method ?? []);
        setNoteOptions(data.notes ?? []);
      })
      .catch(() => {});
  }, []);

  async function addEntry(form) {
    const res = await fetch("/api/brew-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) return;

    const coffee = coffees.find((c) => c.id === Number(form.coffee_id));
    setEntries((prev) => [
      {
        ...form,
        id: Date.now(),
        date: form.brewed_at
          ? new Date(form.brewed_at).toLocaleDateString()
          : "—",
        name: coffee?.name ?? "",
      },
      ...prev,
    ]);
  }

  async function addCoffee(form) {
    const res = await fetch("/api/coffees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) return;

    const data = await res.json();
    setCoffees((prev) => [...prev, data]);
  }

  return (
    <div>
      <h1 className="page-title">📓 My Coffee Journal</h1>
      <p className="page-sub">
        Record every cup you drink and build your taste history.
      </p>
      <div className="log-layout">
        <div>
          <div className="log-form-toggle">
            <button
              className={`btn${activeForm === "brew" ? " primary" : ""}`}
              onClick={() => setActiveForm("brew")}
            >
              Log a cup ☕
            </button>
            <button
              className={`btn${activeForm === "coffee" ? " primary" : ""}`}
              onClick={() => setActiveForm("coffee")}
            >
              Log a coffee 🫘
            </button>
          </div>
          {activeForm === "brew" ? (
            <BrewLogForm
              coffees={coffees}
              methods={methods}
              noteOptions={noteOptions}
              onSubmit={addEntry}
            />
          ) : (
            <CoffeeForm onSubmit={addCoffee} />
          )}
        </div>
        <div>
          {activeForm === "brew" ? (
            <BrewHistory entries={entries} />
          ) : (
            <CoffeeHistory coffees={coffees} />
          )}
        </div>
      </div>
    </div>
  );
}
