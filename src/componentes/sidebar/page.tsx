'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import '../../styles/sidebar.css'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/antigoLogin', label: 'antigoLogin' },
    { href: '/entradas', label: 'Entradas' },
    { href: '/saidas', label: 'Saídas' },
    { href: '/cadastro', label: 'Cadastro' },
  ]

  return (
    <aside className="sidebar">
      <h2>LOGO</h2>
      <nav>
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <h2>SAIR</h2>
    </aside>
  )
}
