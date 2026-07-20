const menuItems = [
  { name: "Dashboard", icon: "▦" },
  { name: "Employees", icon: "♟" },
  { name: "Attendance", icon: "✓" },
  { name: "Leave Requests", icon: "◷" }
];

export default function Sidebar({ page, setPage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">W</div>
        <div>
          <h2>WorkForce</h2>
          <span>PRO</span>
        </div>
      </div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={page === item.name ? "nav-item active" : "nav-item"}
            onClick={() => setPage(item.name)}
          >
            <span>{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-note">
        <strong>Portfolio Project</strong>
        <p>Built with React, state management and localStorage.</p>
      </div>
    </aside>
  );
}
