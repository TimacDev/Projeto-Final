import { useState, useEffect, useRef } from "react";
import BrewLogForm from "./BrewLogForm";
import CoffeeForm from "./CoffeeForm";
import BrewCollection from "./BrewCollection";
import CoffeeCollection from "./CoffeeCollection";
import ErrorMessage from "../ErrorMessage";

export default function MyCoffeeJournal({ coffeePrefill, brewPrefill, submitSignal } = {}) {
  const [entries, setEntries] = useState([]);
  const [coffees, setCoffees] = useState([]);
  const [methods, setMethods] = useState([]);
  const [noteOptions, setNoteOptions] = useState([]);
  const [activeForm, setActiveForm] = useState("brew");
  const [errors, setErrors] = useState([]);

  // A coffee or brew handed back by the chat bot switches us to the matching
  // form so the user lands on it already filled in.
  useEffect(() => {
    if (coffeePrefill) setActiveForm("coffee");
  }, [coffeePrefill]);

  useEffect(() => {
    if (brewPrefill) setActiveForm("brew");
  }, [brewPrefill]);

  // Lets the chat bot "press" the submit button on whichever form is currently
  // open, using whatever the user has actually typed in — not the bot's own
  // data. `requestSubmit()` runs native HTML validation first (required
  // fields, min/max, etc.), so an incomplete form just shows the browser's
  // validation UI instead of submitting. `submitSignal` is a bump counter (see
  // page.js) rather than a boolean so repeated requests re-trigger the effect.
  const coffeeFormRef = useRef(null);
  const brewFormRef = useRef(null);

  useEffect(() => {
    if (!submitSignal) return;
    const formRef = activeForm === "coffee" ? coffeeFormRef : brewFormRef;
    formRef.current?.requestSubmit();
  }, [submitSignal]);

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
        setErrors(data.errors ?? ["Couldn't save your brew log. Please check your entries and try again."]);
        return;
      }

      const { id } = await res.json();
      const coffee = coffees.find((c) => c.id === Number(form.coffee_id));
      setEntries((prev) => [
        {
          ...form,
          id,
          date: form.brewed_at
            ? new Date(form.brewed_at).toLocaleDateString()
            : "—",
          name: coffee?.name ?? "",
        },
        ...prev,
      ]);
      return true;
    } catch {
      setErrors(["Couldn't log a add brew log. Please try again."]);
    }
  }

  async function updateEntry(id, form) {
    try {
      const res = await fetch(`/api/brew-logs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors ?? ["Couldn't update your brew log. Please check your entries and try again."]);
        return;
      }

      const coffee = coffees.find((c) => c.id === Number(form.coffee_id));
      setEntries((prev) =>
        prev.map((e) =>
          e.id === id
            ? {
                ...e,
                ...form,
                date: form.brewed_at
                  ? new Date(form.brewed_at).toLocaleDateString()
                  : "—",
                name: coffee?.name ?? e.name,
              }
            : e,
        ),
      );
      return true;
    } catch {
      setErrors(["Couldn't update the brew log. Please try again."]);
    }
  }

  async function deleteEntry(entry) {
    try {
      const res = await fetch(`/api/brew-logs/${entry.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setErrors(data.errors ?? ["Couldn't delete your brew log. Please try again."]);
        return;
      }

      setEntries((prev) => prev.filter((e) => e.id !== entry.id));
    } catch {
      setErrors(["Couldn't delete the brew log. Please try again."]);
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
        setErrors(data.errors ?? ["Couldn't save your coffee. Please check your entries and try again."]);
        return;
      }

      const data = await res.json();
      setCoffees((prev) => [...prev, data]);
      return true;
    } catch {
      setErrors(["Couldn't log a coffee. Please try again."]);
    }
  }

  function updateCoffeeRating(id, avg) {
    setCoffees((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating: avg } : c)),
    );
  }

  // The bot only knows the coffee by name; the form's select works off coffee_id.
  const brewFormPrefill = brewPrefill
    ? { ...brewPrefill, coffee_id: coffees.find((c) => c.name === brewPrefill.coffee_name)?.id ?? "" }
    : null;

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
              className={`btn${activeForm === "coffee" ? " primary" : ""}`}
              onClick={() => setActiveForm("coffee")}
            >
              Log a coffee 🫘
            </button>
            <button
              className={`btn${activeForm === "brew" ? " primary" : ""}`}
              onClick={() => setActiveForm("brew")}
            >
              Log a cup ☕
            </button>
          </div>
          {activeForm === "brew" ? (
            <BrewLogForm
              ref={brewFormRef}
              key={brewPrefill ? `${JSON.stringify(brewPrefill)}-${coffees.length}` : "empty"}
              coffees={coffees}
              methods={methods}
              noteOptions={noteOptions}
              onSubmit={addEntry}
              prefill={brewFormPrefill}
            />
          ) : (
            <CoffeeForm
              ref={coffeeFormRef}
              key={coffeePrefill ? JSON.stringify(coffeePrefill) : "empty"}
              onSubmit={addCoffee}
              initialValues={coffeePrefill}
            />
          )}
        </div>
        <div>
          {activeForm === "brew" ? (
            <BrewCollection
              entries={entries}
              coffees={coffees}
              methods={methods}
              noteOptions={noteOptions}
              onUpdate={updateEntry}
              onDelete={deleteEntry}
            />
          ) : (
            <CoffeeCollection
              coffees={coffees}
              onRated={updateCoffeeRating}
              onError={setErrors}
            />
          )}
        </div>
      </div>
    </div>
      <ErrorMessage messages={errors} onDismiss={() => setErrors([])} />
    </>
  );
}
