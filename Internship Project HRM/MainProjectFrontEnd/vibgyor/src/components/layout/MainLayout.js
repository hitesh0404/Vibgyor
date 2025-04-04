import Sidebar from "./Sidebar"
import Header from "./Header"
import "./MainLayout.css"

const MainLayout = ({ children, title }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <div className="content-area">{children}</div>
      </div>
    </div>
  )
}

export default MainLayout

