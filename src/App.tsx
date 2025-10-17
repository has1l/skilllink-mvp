import { Routes, Route, Navigate } from 'react-router-dom'
import { Sidebar } from './components/nav/Sidebar'
import { Topbar } from './components/nav/Topbar'
import Feed from './pages/Feed'
import Chat from './pages/Chat'
import Skills from './pages/Skills'
import Sessions from './pages/Sessions'
import Profile from './pages/Profile'
import Auth from './pages/Auth'
import LinkTelegram from './pages/LinkTelegram'

export default function App() {
  return (
    <div className="min-h-full flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 md:p-8 bg-[linear-gradient(180deg,rgba(99,102,241,0.06),transparent)] flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/feed" replace />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/link-telegram" element={<LinkTelegram />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
