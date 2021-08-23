const Search: React.FC = () => {
  const handleSearch = (evt: any) => {
    console.log(evt.target.value)
  }

  return (
    <input
      className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-400 outline-none rounded-lg shadow-sm w-full py-1.5"
      type="text"
      placeholder="Search Devparty..."
      onChange={handleSearch}
    />
  )
}

export default Search
