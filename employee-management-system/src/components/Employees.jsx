import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  department: "Engineering",
  role: "",
  salary: "",
  status: "Active"
};

export default function Employees({
  employees,
  addEmployee,
  updateEmployee,
  deleteEmployee
}) {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.role.trim()) {
      alert("Please complete name, email and role.");
      return;
    }

    if (editingId) {
      const original = employees.find((employee) => employee.id === editingId);
      updateEmployee({
        ...original,
        ...form,
        id: editingId,
        salary: Number(form.salary)
      });
    } else {
      addEmployee({ ...form, salary: Number(form.salary) });
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      salary: employee.salary,
      status: employee.status
    });
    setEditingId(employee.id);
    setShowForm(true);
  };

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Company Directory</p>
          <h2>Employee records</h2>
          <p>Add, edit, search and remove employee information.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Add Employee"}
        </button>
      </div>

      {showForm && (
        <form className="employee-form panel" onSubmit={handleSubmit}>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email address" type="email" />
          <select name="department" value={form.department} onChange={handleChange}>
            <option>Engineering</option>
            <option>Human Resources</option>
            <option>Sales</option>
            <option>Finance</option>
            <option>Marketing</option>
          </select>
          <input name="role" value={form.role} onChange={handleChange} placeholder="Job role" />
          <input name="salary" value={form.salary} onChange={handleChange} placeholder="Monthly salary" type="number" min="0" />
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Active</option>
            <option>On Leave</option>
            <option>Inactive</option>
          </select>
          <button className="primary-btn" type="submit">
            {editingId ? "Update Employee" : "Save Employee"}
          </button>
        </form>
      )}

      <div className="table-wrap panel">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <strong>{employee.name}</strong>
                  <span>{employee.email}</span>
                </td>
                <td>{employee.department}</td>
                <td>{employee.role}</td>
                <td>₹{Number(employee.salary).toLocaleString("en-IN")}</td>
                <td>
                  <span className={`status ${employee.status.toLowerCase().replace(" ", "-")}`}>
                    {employee.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="ghost-btn" onClick={() => startEdit(employee)}>Edit</button>
                    <button
                      className="danger-btn"
                      onClick={() => {
                        if (confirm(`Delete ${employee.name}?`)) deleteEmployee(employee.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {employees.length === 0 && (
          <div className="empty-state">No employees match your search.</div>
        )}
      </div>
    </section>
  );
}
