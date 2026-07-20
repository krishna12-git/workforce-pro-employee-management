export default function Dashboard({ employees, leaves }) {
  const active = employees.filter((employee) => employee.status === "Active").length;
  const present = employees.filter((employee) => employee.attendance === "Present").length;
  const pendingLeaves = leaves.filter((leave) => leave.status === "Pending").length;
  const payroll = employees.reduce((total, employee) => total + Number(employee.salary), 0);

  const departments = employees.reduce((result, employee) => {
    result[employee.department] = (result[employee.department] || 0) + 1;
    return result;
  }, {});

  const maxDepartment = Math.max(...Object.values(departments), 1);

  return (
    <section className="page-section">
      <div className="hero-card">
        <div>
          <span className="pill">Live Company Overview</span>
          <h2>Manage your people with clarity.</h2>
          <p>
            Track employees, daily attendance, leave requests and payroll
            information from one practical dashboard.
          </p>
        </div>
        <div className="hero-number">
          <strong>{employees.length}</strong>
          <span>Total Employees</span>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Active Employees" value={active} icon="↗" />
        <StatCard label="Present Today" value={present} icon="✓" />
        <StatCard label="Pending Leaves" value={pendingLeaves} icon="◷" />
        <StatCard label="Monthly Payroll" value={`₹${payroll.toLocaleString("en-IN")}`} icon="₹" />
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Workforce Distribution</p>
              <h3>Employees by department</h3>
            </div>
          </div>

          <div className="bar-list">
            {Object.entries(departments).map(([department, count]) => (
              <div className="bar-row" key={department}>
                <div className="bar-label">
                  <span>{department}</span>
                  <strong>{count}</strong>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: `${(count / maxDepartment) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Recent Employees</p>
              <h3>Team directory</h3>
            </div>
          </div>

          <div className="mini-list">
            {employees.slice(-4).reverse().map((employee) => (
              <div className="mini-row" key={employee.id}>
                <div className="initial">
                  {employee.name.split(" ").map((word) => word[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <strong>{employee.name}</strong>
                  <span>{employee.role}</span>
                </div>
                <span className={`status ${employee.status.toLowerCase().replace(" ", "-")}`}>
                  {employee.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <article className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p>{label}</p>
      <strong>{value}</strong>
    </article>
  );
}
