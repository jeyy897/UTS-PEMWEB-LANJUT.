import { useState } from 'react'

const App = () => {
  const [contacts, setContacts] = useState([
    { name: 'Arto Hellas', number: '08123456789' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [editingIndex, setEditingIndex] = useState(null)

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

  const addOrEditContact = (e) => {
    e.preventDefault()

    if (!newName || !newNumber) return

    if (editingIndex !== null) {
      const updated = [...contacts]
      updated[editingIndex] = { name: newName, number: newNumber }
      setContacts(updated)
      setEditingIndex(null)
    } else {
      if (contacts.some(c => c.name.toLowerCase() === newName.toLowerCase())) {
        alert(`${newName} sudah ada di daftar kontak.`)
        return
      }
      setContacts([...contacts, { name: newName, number: newNumber }])
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteContact = (index) => {
    if (confirm('Yakin mau hapus kontak ini?')) {
      const updated = contacts.filter((_, i) => i !== index)
      setContacts(updated)
    }
  }

  const editContact = (index) => {
    setEditingIndex(index)
    setNewName(contacts[index].name)
    setNewNumber(contacts[index].number)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-400 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md border-2 border-blue-300">
        <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">📘 Phonebook</h1>

        <form onSubmit={addOrEditContact} className="space-y-6">
          <div>
            <label className="block text-blue-900 font-medium text-lg">Nama</label>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder="Contoh: Budi"
              className="mt-2 w-full p-4 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
              required
            />
          </div>
          <div>
            <label className="block text-blue-900 font-medium text-lg">Nomor Telepon</label>
            <input
              type="tel"
              value={newNumber}
              onChange={handleNumberChange}
              placeholder="08xxxxxxxx"
              className="mt-2 w-full p-4 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-900"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-300"
          >
            {editingIndex !== null ? '💾 Simpan Perubahan' : '➕ Tambahkan Kontak'}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">📋 Daftar Kontak</h2>
          <ul className="space-y-4 max-h-64 overflow-y-auto pr-1">
            {contacts.map((c, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-blue-100 border-2 border-blue-300 p-4 rounded-lg hover:bg-blue-200 transition"
              >
                <div className="text-blue-900">
                  <span className="font-bold">{c.name}</span> — {c.number}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => editContact(i)}
                    className="text-sm px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition duration-200"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteContact(i)}
                    className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition duration-200"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
