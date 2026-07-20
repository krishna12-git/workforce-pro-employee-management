import { useEffect, useMemo, useState } from "react";
import { starterEmployees, starterLeaves } from "./data";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Employees from "./components/Employees";
import Attendance from "./components/Attendance";
import LeaveManagement from "./components/LeaveManagement";

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  
  
  }
};

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [employees, setEmployees] = useState(() =>
    readStorage("wf-employees", starterEmployees)
  );
  const [leaves, setLeaves] = useState(() =>
    readStorage("wf-leaves", starterLeaves)
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("wf-employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("wf-leaves", JSON.stringify(leaves));
  }, [leaves]);

  const filteredEmployees = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return employees;
    return employees.filter((employee) =>
      [employee.name, employee.email, employee.department, employee.role]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, search]);

  const addEmployee = (employee) => {
    setEmployees((current) => [
      ...current,
      { ...employee, id: Date.now(), attendance: "Present" }
    ]);
  };

  const updateEmployee = (updated) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === updated.id ? updated : employee
      )
    );
  };

  const deleteEmployee = (id) => {
    setEmployees((current) =>
      current.filter((employee) => employee.id !== id)
    );
  };

  const updateAttendance = (id, attendance) => {
    setEmployees((current) =>
      current.map((employee) =>
        employee.id === id ? { ...employee, attendance } : employee
      )
    );
  };

  const addLeave = (leave) => {
    setLeaves((current) => [
      ...current,
      { ...leave, id: Date.now(), status: "Pending" }
    ]);
  };

  const updateLeaveStatus = (id, status) => {
    setLeaves((current) =>
      current.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  return (
    <div className="app-shell">
      <Sidebar page={page} setPage={setPage} />

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Employee Operations Platform</p>
            <h1>{page}</h1>
          </div>

          <div className="topbar-actions">
            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees..."
            />
            <div className="profile">
              <div className="avatar">KY</div>
              <div>
                <strong>Krishna Yadav</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {page === "Dashboard" && (
          <Dashboard employees={employees} leaves={leaves} />
        )}

        {page === "Employees" && (
          <Employees
            employees={filteredEmployees}
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            deleteEmployee={deleteEmployee}
          />
        )}

        {page === "Attendance" && (
          <Attendance
            employees={filteredEmployees}
            updateAttendance={updateAttendance}
          />
        )}

        {page === "Leave Requests" && (
          <LeaveManagement
            employees={employees}
            leaves={leaves}
            addLeave={addLeave}
            updateLeaveStatus={updateLeaveStatus}
          />
        )}
      </main>
    </div>
  );
}
