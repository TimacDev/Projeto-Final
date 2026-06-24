import { useState, useEffect } from "react";
import BrewLogForm from "./BrewLogForm";
import CoffeeForm from "./CoffeeForm";
import BrewHistory from "./BrewHistory";
import CoffeeHistory from "./CoffeeHistory";
import ErrorMessage from "../ErrorMessage";

export default function MyCoffeeJournal() {
  const [entries, setEntries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [methods, setMethods] = useState([]);
  const [noteOptions, setNoteOptions] = useState([]);
  const [activeForm, setActiveForm] = useState("brew");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/api/coffees")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => setCoffees(data))
      .catch(() => setErrors(["Failed to load your coffees history."]));

    fetch("/api/brew-logs")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
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
      .catch(() => setErrors(["Failed to load your brew logs history."]));

    fetch("/api/brew-logs/options")
      .then((res) => { if (!res.ok) throw new Error(); return res.json(); })
      .then((data) => {
        setMethods(data.method ?? []);
        setNoteOptions(data.notes ?? []);
      })
      .catch(() => setErrors(["Failed to load brew options."]));
  }, []);

  async function addEntry(form) {
    try {
      const res = await fetch("/api/brew-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors ?? ["Something went wrong."]);
        return;
      }

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
      return true;
    } catch {
      setErrors(["Connection problem. Couldn't log a brew log. Please try again."]);
    }
  }

  async function addCoffee(form) {
    try {
      const res = await fetch("/api/coffees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors ?? ["Something went wrong."]);
        return;
      }

      const data = await res.json();
      setCoffees((prev) => [...prev, data]);
      return true;
    } catch {
      setErrors(["Connection problem. Couldn't log a coffee. Please try again."]);
    }
  }

  return (
    <>
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
      <ErrorMessage messages={errors} onDismiss={() => setErrors([])} />
    </>
  );
}
