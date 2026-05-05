import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function Layout({ children }) {
  return (
    <div className="ad-shell">
      <Sidebar />
      <div className="ad-main">
        <Topbar />
        {children}
      </div>
    </div>
  )
}
