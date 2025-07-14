import React from "react"
import { NavLink } from "react-router-dom"
import { Home, Building } from "lucide-react"

const linkClass = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-3 rounded-md text-gray-700 hover:bg-gray-200 ${isActive ? "bg-gray-300 font-semibold" : ""}`

export function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Qulture Org</h2>

      <nav className="flex flex-col gap-1">
        <NavLink to="/" className={linkClass} end>
          <Home size={18} />
          Companies
        </NavLink>
        <NavLink to="/companies/new" className={linkClass}>
          <Building size={18} />
          New Company
        </NavLink>
      </nav>

      <footer className="mt-auto text-xs text-gray-400">
        &copy; 2025 Qulture
      </footer>
    </aside>
  )
}
