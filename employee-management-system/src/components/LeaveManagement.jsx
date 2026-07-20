import { useState } from "react";

export default function LeaveManagement({
  employees,
  leaves,
  addLeave,
  updateLeaveStatus
}) {
  const [form, setForm] = useState({
    employee: employees[0]?.name || "",
    type: "Personal",
    from: "",
    to: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.employee || !form.from || !form.to) {
      alert("Please complete all leave details.");
      return;
    }

    if (form.to < form.from) {
      alert("End date cannot be before start date.");
      return;
    }

    addLeave(form);
    setForm({
      employee: employees[0]?.name || "",
      type: "Personal",
      from: "",
      to: ""
    });
  };

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Approval Workflow</p>
          <h2>Leave management</h2>
          <p>Create requests and approve or reject pending applications.</p>
        </div>
      </div>

      <form className="leave-form panel" onSubmit={handleSubmit}>
        <select
          value={form.employee}
          onChange={(event) => setForm({ ...form, employee: event.target.value })}
        >
          {employees.map((employee) => (
            <option key={employee.id}>{employee.name}</option>
          ))}
        </select>

        <select
          value={form.type}
          onChange={(event) => setForm({ ...form, type: event.target.value })}
        >
          <option>Personal</option>
          <option>Medical</option>
          <option>Vacation</option>
          <option>Emergency</option>
        </select>

        <input
          type="date"
          value={form.from}
          onChange={(event) => setForm({ ...form, from: event.target.value })}
        />
        <input
          type="date"
          value={form.to}
          onChange={(event) => setForm({ ...form, to: event.target.value })}
        />

        <button className="primary-btn" type="submit">Submit Request</button>
      </form>

      <div className="leave-list">
        {leaves.map((leave) => (
          <article className="leave-card panel" key={leave.id}>
            <div>
              <span className={`status ${leave.status.toLowerCase()}`}>
                {leave.status}
              </span>
              <h3>{leave.employee}</h3>
              <p>{leave.type} Leave · {leave.from} to {leave.to}</p>
            </div>

            {leave.status === "Pending" && (
              <div className="action-buttons">
                <button className="approve-btn" onClick={() => updateLeaveStatus(leave.id, "Approved")}>
                  Approve
                </button>
                <button className="danger-btn" onClick={() => updateLeaveStatus(leave.id, "Rejected")}>
                  Reject
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
