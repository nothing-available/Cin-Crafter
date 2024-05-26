import { useEffect } from "react"
import { getMovies } from "./utils/api";
import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration } from "./store/homeSlice";


function App() {

  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);

  console.log(url)

  useEffect(() => {
    apiTesting();
  }, []);

  const apiTesting = () => {
    getMovies('/movie/popular')
      .then((res) => {
        console.log(res);
        dispatch(getApiConfiguration(res));
      });
  };

  return (
    <>
      <h1>Hii</h1>

    </>
  )
}

export default App
