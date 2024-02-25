import { useState } from 'react'

function App() {
  const [msg, setMsg] = useState('')

  const handleCheckStatus = () => {
    async function callCheckStatus() {
      const result = await window.electronAPI.checkStatus()

      setMsg(result)
    }
    callCheckStatus()
  }

  const handleInsertString = () => {
    async function callCheckStatus() {
      await window.electronAPI.insertString({ id: '1' })
    }
    callCheckStatus()
  }

  const handleQueryString = () => {
    async function callCheckQuery() {
      await window.electronAPI.getAllString()
    }
    callCheckQuery()
  }
  return (
    <div>
      <h1>This app is running by electron</h1>
      <p>
        This is a <a href="https://www.electronjs.org/">Doc</a>
      </p>
      <button type="butotn" onClick={handleCheckStatus}>
        Check Status
      </button>
      <p>MSG: {msg}</p>

<button type="butotn" onClick={handleInsertString}>
  Insert
</button>

<button type="butotn" onClick={handleQueryString}>
  Query
</button>
    </div>
  )
}

export default App
