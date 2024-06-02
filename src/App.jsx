import { useEffect } from "react"
import { fetchDataFromApi } from "./utils/api"



function App() {

  useEffect(() => {
    apiTest();
  }, [])

  const apiTest = () => {
    fetchDataFromApi('/movie/popular')
      .then((res) => {
        console.log(res
        )
      })
  }

  return (
    <div>
    </div>
  )
}

export default App
