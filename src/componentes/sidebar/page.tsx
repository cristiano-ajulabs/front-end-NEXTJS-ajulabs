'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  PlusCircle,
  ArrowDownCircle,
  ArrowUpCircle,
  Users,
  FileText,
  Shield
} from 'lucide-react'
import '../../styles/sidebar.css'

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/contribuir', label: 'Nova Contribuição', icon: <PlusCircle size={18} /> },
    { href: '/entradas', label: 'Entradas', icon: <ArrowDownCircle size={18} color="#16a34a" /> },
    { href: '/saidas', label: 'Saídas', icon: <ArrowUpCircle size={18} color="#dc2626" /> },
    { href: '/tesoureiro', label: 'Tesoureiros', icon: <Users size={18} /> },
    { href: '/relatorios', label: 'Relatórios', icon: <FileText size={18} /> },
    { href: '/obreiro', label: 'Pastoral', icon: <Shield size={18} /> },
  ]

  return (
    <aside className="sidebar">
      <h2 className="logo">LOGO</h2>
      <nav>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            <span className="icon">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <button
        type="button"
        onClick={() => router.push("/")}
        className="btn-side"
      >
        SAIR
      </button>
    </aside>
  )
}
