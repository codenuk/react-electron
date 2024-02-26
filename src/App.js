import { useEffect, useState } from 'react'

function App() {
  const [dataList, setDataList] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function callIntitialSetup() {
      const result = await window.electronAPI.intitialSetup()

      console.log('intitialSetup: ', result)
    }
    callIntitialSetup()
  }, [])

  const handleCheckStatus = () => {
    async function callCheckStatus() {
      const result = await window.electronAPI.checkStatus()

      setMsg(result)
    }
    callCheckStatus()
  }

  const handleInsert = () => {
    let r = (Math.random() + 1).toString(36).substring(7);

    async function callInsertString() {
      const result = await window.electronAPI.insertContacts({ name: r, email: `${r}@gmail.com` })
      console.log('insertContacts: ', result)
    }
    callInsertString()
  }

  const handleQuery = () => {
    async function callCheckQuery() {
      const result = await window.electronAPI.getAllContacts()
      console.log('getAllContacts: ', result)
      setDataList(result)
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

      <button type="butotn" onClick={handleInsert}>
        Insert
      </button>

      <button type="butotn" onClick={handleQuery}>
        Query
      </button>

      {dataList.map((data, index) => (<p key={index}>{index + 1} name: {data.name}, email: {data.email}</p>))}
    </div>
  )
}

export default App
