import Dexie from 'dexie'
import getDataUrl from '../lib/getDataUrl'

const db = new Dexie('greenferries')

db.version(1).stores({
  dataVersions: 'version',
  ships: 'id,slug,name,gCo2PerMilePax,companyId',
  companies: 'id,slug',
  routes: 'id,slug,cityA.name',
  countries: 'code',
  airports: 'code,country'
})

const clearDb = async () => {
  await db.dataVersions.toCollection().delete()
  await db.ships.toCollection().delete()
  await db.companies.toCollection().delete()
  await db.routes.toCollection().delete()
  await db.countries.toCollection().delete()
  await db.airports.toCollection().delete()
}

const getDataVersion = async () => {
  const dataVersionRow = await db.dataVersions.toCollection().first()
  return dataVersionRow ? dataVersionRow.version : null
}

const refreshData = async () => {
  const res = await window.fetch(getDataUrl())
  const data = await res.json()
  await clearDb()
  await db.ships.bulkPut(data.ships)
  await db.routes.bulkPut(data.routes)
  const companies = data.companies.map(company => (
    { ...company, ships: data.ships.filter(s => s.company.id === company.id) }
  ))
  await db.companies.bulkPut(companies)
  await db.dataVersions.put({ version: data.version })
  await db.countries.bulkPut(data.countries)
  await db.airports.bulkPut(data.airports)
}

const dataNeedsRefresh = async () => {
  const localDataVersion = await getDataVersion()
  if (!localDataVersion) return true
  const dataVersionFetch = await window.fetch('/dataVersion.json')
  const distantData = await dataVersionFetch.json()
  // console.log(`comparing ${localDataVersion} and ${distantData.version}`)
  return localDataVersion !== distantData.version
}

export { db, clearDb, dataNeedsRefresh, refreshData }
