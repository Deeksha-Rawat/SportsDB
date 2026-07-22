import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-semibold">SportsDB</h1>
      <p className="text-gray-600">React + Tailwind CSS is configured and ready.</p>
      <button
        type="button"
        onClick={() => setCount((count) => count + 1)}
        className="rounded-md bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700"
      >
        Count is {count}
      </button>
    </div>
  )
}

export default App
