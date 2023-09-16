import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Card, Chip, Container, Divider } from "@mui/material";
import axios from "axios";
import UserCard from "../Card/UserCard";
import Navbar from "../Navbar/Navbar";
import SearchB from "../Search/Search";

export default function Home() {
  const [recentSearches, setSearches] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [userFavs, setUserFavs] = useState([]);
  const [toUpdate, setUpdate] = useState(false);
  console.log('component')
  const handleSearch = async () => {
    let arrUsernames=[];
    try{
      await axios.post(
        "http://localhost:8080/api/search/saveQuery",
        { query: searchInput },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
    }
    catch(e){
      console.error(e)
    }
    try{
      const resFavs= await axios
      .get(`http://localhost:8080/api/genomeFavs/getFavs/${false}`, {
        headers: { Authorization: localStorage.getItem("token") },
        })
        arrUsernames= resFavs.data.payload.map((obj) => obj.username);
        await setUserFavs(arrUsernames);
        console.log(userFavs)
    }
    catch(e){
      console.error(e)
    }
    try{
      const apiRes = await axios.post(
        "https://torre.ai/api/entities/_searchStream",
        {
          query: searchInput,
          identityType: "person",
          limit: 10,
          meta: true,
        }
      );
      const arrRes = apiRes.data.split("\n");
      arrRes.pop();
      const data = arrRes.map((val) => {
        let isFav = false;
        try {
          console.log(userFavs)
          let { name, imageUrl, professionalHeadline,username } = JSON.parse(val);
          if (arrUsernames.includes(username.toString())) isFav = true;
          return { name, imageUrl, professionalHeadline,username, isFav };
        } catch (e) {
          console.log(e);
          return []
        }
    });

    return data || [];
    }
    catch(e){
      console.error(e)
    }
  };
  const getData = async () => {
    try {
      const data = await handleSearch();
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    console.log(toUpdate)
    if(toUpdate)getData()
  },[toUpdate])
  useEffect(() => {

    if (!localStorage.getItem("token")) return;
    axios
      .get("http://localhost:8080/api/search/getRecentQueries", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setSearches(res.data.payload);
      })
      .catch((e) => console.log(e));
  }, []);
  
  return (
    <>
    <Navbar/>
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SearchB props={{setSearchInput,recentSearches, setUpdate}} />
      
      {results?.length ? (
        <Container
          sx={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            maxHeight: "50vh",
          }}
        >
          {results.map((person) => {
            return <UserCard person={person} />;
          })}
        </Container>
      ) : (
        <></>
      )}
    </Container>
    </>
  );
}
