import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100vw;
  height: 100vh;

  color: white;
`;

function Search() {
  const [searchParams, _] = useSearchParams();

  return <Container>{searchParams.get("keyword")}</Container>;
}

export default Search;
