import Dexie from 'dexie'

export const db = new Dexie('LifeOSDB')
db.version(1).stores({
  keyval: 'id, value'
})

export const dexieStorage = {
  getItem: async (name) => {
    const record = await db.keyval.get(name)
    return record ? record.value : null
  },
  setItem: async (name, value) => {
    await db.keyval.put({ id: name, value })
  },
  removeItem: async (name) => {
    await db.keyval.delete(name)
  }
}

export async function exportDataToFile() {
  const data = await db.keyval.get('los_data')
  if (!data) return
  
  const blob = new Blob([data.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `lifeos-backup-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function importDataFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const text = e.target.result
        // Basic validation
        JSON.parse(text)
        await db.keyval.put({ id: 'los_data', value: text })
        resolve()
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = reject
    reader.readAsText(file)
  })
}
