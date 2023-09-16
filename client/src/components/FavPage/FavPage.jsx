import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import axios from "axios";
import { Chip, Container, Divider,Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import UserCard from "../Card/UserCard.jsx";
import SearchB from "../Search/Search.jsx";
import Pagination from "@mui/material/Pagination";

const FavPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [userFavs, setUserFavs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults,setTotalResults]=useState(1)
  const [toUpdate, setUpdate] = useState(false);
const [totalPages,setTotalPages]=useState(0)
  const makePagination=(total)=>{
      const result=Math.ceil(total/10)
      setTotalResults(total)
    setTotalPages(result)
}
  const handlePaginationChange = async (e, value) => {
    setPage(value)
}
useEffect(()=>{
    console.log(page)
    getSearch()
    .then(total=>makePagination(total))
},[page])
  
  const getSearch=async ()=>{   
    try{
        const res= await axios.post(`http://localhost:8080/api/genomeFavs/findByName/${page}`,{searchQuery:searchInput},{ headers: { Authorization: localStorage.getItem("token") } })
        console.log(!res.data.payload.results.length)
        if(!res.data.payload.results.length)setUserFavs([])
        setUserFavs(res.data.payload.results.map((obj) => ({
            ...obj,
            isFav: true,
          })))
          console.log(res.data.payload)
          return res.data.payload.totalResults
    }
    catch(e){
        console.error(e)
        setUserFavs([])
        return 0
    }
}
useEffect(()=>{
    if(toUpdate){
        setPage(1)
      setUpdate(false)
      getSearch()
      .then(total=>{
        console.log(total)
        makePagination(total)})
        console.log(userFavs)
      
    }
  },[toUpdate])
  return (
    <>
      <Navbar />
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchB props={{ setSearchInput, setUpdate, toUpdate,searchInput }} />
        <Pagination
          page={page}
          onChange={handlePaginationChange}
          count={totalPages}
          color="primary"
        />

       
            {
                userFavs.length?( <Container
                    sx={{
                      marginTop: "40px",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      maxHeight: "50vh",
                    }}
                  >
                {    userFavs.map((person) => {
                  return (<UserCard person={person} />)
                })}
                </Container>
                ):(
                    <Container
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      maxHeight: "50vh",
                      
                    }}
                  >
                <Typography>No results</Typography>
                </Container>
                )
            }
        
      </Container>
    </>
  );
};

export default FavPage;
