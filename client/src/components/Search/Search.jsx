import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Chip, Container, Divider } from "@mui/material";
import axios from "axios";

// NEED THE PROPS :
//   setSearchInput, setUpdate, toUpdate,searchInput
const SearchB = ({ props }) => {
  const [recentSearches, setSearches] = useState([]);

  const pushQuery = async () => {
    try {
      console.log(props.searchInput);
      await axios.post(
        "http://localhost:8080/api/search/saveQuery",
        { query: props.searchInput },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) return;
    console.log(props);
    if (props.searchInput) pushQuery();
    axios
      .get("http://localhost:8080/api/search/getRecentQueries", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setSearches(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, [props.toUpdate]);
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TextField
        sx={{ width: "60%" }}
        label="Search"
        value={props.searchInput}
        onChange={(e) => props.setSearchInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            props.setUpdate(true);
          }
        }}
      />
      {recentSearches?.length ? (
        <>
          <Divider
            textAlign="left"
            sx={{ color: "grey", marginTop: "15px", marginBottom: "15px" }}
          >
            Recent searches
          </Divider>
          <Container>
            <Container
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {recentSearches?.map((query, i) => (
                <Chip
                  key={i}
                  label={query}
                  onClick={() => {
                    props.setSearchInput(query);
                    props.setUpdate(true);
                  }}
                />
              ))}
            </Container>
          </Container>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default SearchB;