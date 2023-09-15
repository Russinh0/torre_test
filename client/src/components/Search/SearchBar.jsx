import * as React from "react";
import TextField from "@mui/material/TextField";
import { Chip, Container, Divider } from "@mui/material";
import axios from "axios";

export default function SearchBar() {
  const [recentSearches, setSearches] = React.useState([]);
  const [searchInput, setSearchInput]= React.useState("")
  React.useEffect(()=>{
     axios.get('http://localhost:8080/api/search/getRecentQueries',{headers:{'Authorization':localStorage.getItem('token')}})
    .then(res=>{
      setSearches(res.data.payload)
    })
    .catch((e)=>console.log(e))
  },[])
  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <TextField
      sx={{width:'60%'}}
        label="Search"
        value={searchInput}
        onChange={(e)=>{
          setSearchInput(e.target.value)}}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            console.log(searchInput)
            axios
              .post("http://localhost:8080/api/search/saveQuery",{query:searchInput},{headers:{'Authorization':localStorage.getItem('token')}})
              .then((res) => {
                return res.data;
              })
              .catch(e=>{
                console.log(e.message)
                return []
              })
          }
        }}
      />
      {
        
        recentSearches?.length?(
          <>
          <Divider textAlign="left" sx={{color:'grey',marginTop:'15px',marginBottom:'15px'}}>Recent searches</Divider>
          <Container sx={{        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",gap: '5px'}}>
          {
            recentSearches?.map((query,i)=>(<Chip key={i} label={query} onClick={()=>setSearchInput(query)} />)
            )
          }
        </Container>
        </>
        ):(<></>)
      }
    </Container>
  );
}
