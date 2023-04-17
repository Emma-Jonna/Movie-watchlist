import { useParams } from "react-router-dom";

function Movie() {
  const {id} = useParams()
  console.log(id);
  return <h1>Movie Works</h1>;
}

export default Movie;
