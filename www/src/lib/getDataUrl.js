
const getDataUrl = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const source = urlParams.get('source')
  return {
    production: 'http://admin.greenferries.org/data_dump',
    local: 'http://localhost:5000/data_dump'
  }[source] || '/data.json'
}

export default getDataUrl
