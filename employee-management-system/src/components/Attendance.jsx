export default function Attendance({ employees, updateAttendance }) {
  const today = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full"
  }).format(new Date());

  return (
    <section className="page-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Daily Operations</p>
          <h2>Attendance tracker</h2>
          <p>{today}</p>
        </div>
      </div>

      <div className="attendance-grid">
        {employees.map((employee) => (
          <article className="attendance-card" key={employee.id}>
            <div className="employee-summary">
              <div className="initial">
                {employee.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
              </div>
              <div>
                <strong>{employee.name}</strong>
                <span>{employee.department}</span>
              </div>
            </div>

            <div className="attendance-options">
              {["Present", "Absent", "Leave"].map((option) => (
                <button
                  key={option}
                  className={employee.attendance === option ? "attendance-btn selected" : "attendance-btn"}
                  onClick={() => updateAttendance(employee.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
