// app/(app)/layout.tsx
import Sidebar from '../../componentes/sidebar/page'
import '../../styles/sidebar.css'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
