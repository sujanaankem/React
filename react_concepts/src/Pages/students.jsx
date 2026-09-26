import { useEffect, useState } from "react";

const API_URL = "https://api.elurucoders.online/api/students";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
};

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  const text = await response.text();
  let result = null;

  if (text) {
    try {
      result = JSON.parse(text);
    } catch {
      result = null;
    }
  }

  if (!response.ok || result?.success === false) {
    throw new Error(
      result?.error || result?.message || `Request failed (${response.status})`
    );
  }

  return result;
}

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadStudents() {
    setLoading(true);
    setError("");

    try {
      const result = await request(API_URL);
      setStudents(Array.isArray(result?.data) ? result.data : []);
    } catch (err) {
      setError(err.message || "Could not load students.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(student) {
    setEditingId(student._id);
    setForm({
      name: student.name ?? "",
      email: student.email ?? "",
      phone: student.phone ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");

    const isEditing = editingId !== null;
    const url = isEditing ? `${API_URL}/${editingId}` : API_URL;

    try {
      await request(url, {
        method: isEditing ? "PUT" : "POST",
        body: JSON.stringify(form),
      });

      resetForm();
      await loadStudents();
    } catch (err) {
      setError(err.message || "Could not save student.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(student) {
    if (!window.confirm(`Delete ${student.name}?`)) return;

    setError("");

    try {
      await request(`${API_URL}/${student._id}`, { method: "DELETE" });
      setStudents((current) =>
        current.filter((item) => item._id !== student._id)
      );

      if (editingId === student._id) resetForm();
    } catch (err) {
      setError(err.message || "Could not delete student.");
    }
  }

  return (
    <main className="students-page">
      <style>{`
        .students-page {
          max-width: 1000px;
          margin: 40px auto;
          padding: 0 20px;
          color: #1f2937;
          font-family: Arial, sans-serif;
        }
        .students-page h1 { margin-bottom: 24px; }
        .student-form, .student-table-wrap {
          padding: 22px;
          margin-bottom: 28px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          box-shadow: 0 2px 8px #0000000a;
        }
        .student-form h2 { margin-top: 0; }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 14px;
        }
        .form-grid label { display: grid; gap: 6px; font-size: 14px; }
        .form-grid input {
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
        }
        .form-actions { display: flex; gap: 10px; margin-top: 18px; }
        .students-page button {
          padding: 9px 14px;
          border: 0;
          border-radius: 6px;
          cursor: pointer;
        }
        .students-page button:disabled { opacity: 0.6; cursor: not-allowed; }
        .primary-button { color: white; background: #2563eb; }
        .secondary-button { background: #e5e7eb; }
        .edit-button { background: #fef3c7; }
        .delete-button { color: #b91c1c; background: #fee2e2; }
        .table-scroll { overflow-x: auto; }
        .students-page table { width: 100%; border-collapse: collapse; }
        .students-page th, .students-page td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .actions { display: flex; gap: 8px; }
        .error-message { color: #b91c1c; margin-bottom: 16px; }
      `}</style>

      <h1>Students</h1>

      {error && <p className="error-message">{error}</p>}

      <form className="student-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit student" : "Add student"}</h2>

        <div className="form-grid">
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Phone
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={saving}>
            {saving
              ? "Saving..."
              : editingId
                ? "Update student"
                : "Add student"}
          </button>

          {editingId && (
            <button
              className="secondary-button"
              type="button"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <section className="student-table-wrap">
        <h2>Student list</h2>

        {loading ? (
          <p>Loading students...</p>
        ) : students.length === 0 ? (
          <p>No students found.</p>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="edit-button"
                          type="button"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => handleDelete(student)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}