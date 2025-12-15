import { Dock, Navbar, Welcome } from "#components"

const App = () => {
  return (
    <div className="text-2xl">
      <main>
        <Navbar />
        <Welcome />
        <Dock />
      </main>
    </div>
  )
}

export default App