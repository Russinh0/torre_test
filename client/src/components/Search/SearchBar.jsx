import {useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import { Card, Chip, Container, Divider } from "@mui/material";
import axios from "axios";
import UserProfile from "../Card/UserProfile";

export default function SearchBar() {
  const [recentSearches, setSearches] = useState([]);
  const [searchInput, setSearchInput]= useState("")
  const [results,setResults]= useState([])
  const [userFavs,setUserFavs]= useState([])
  const handleSearch= async()=>{
    const res = await axios.post("http://localhost:8080/api/search/saveQuery",{query:searchInput},{headers:{'Authorization':localStorage.getItem('token')}})
    const apiRes =await axios.post('https://torre.ai/api/entities/_searchStream',{
      "query": searchInput,
      "identityType": "person",
      "limit": 10,
      "meta": true
    })
    const arrRes = apiRes.data.split("\n")
   arrRes.pop()
   const data= arrRes.map(val=>{
    try{
      let {name,imageUrl,professionalHeadline,ardaId}=JSON.parse(val)
      if(userFavs[0]){
        if(!userFavs.length?.find(ardaId)) ardaId=null
      }
      return {name,imageUrl,professionalHeadline,ardaId}

    }catch(e){
      console.error(e)
    }
  })
  return data || []
  }
  const getData= async ()=>{
    try{
      const data = await handleSearch()
      setResults(data)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    
    if(!localStorage.getItem('token'))return
     axios.get('http://localhost:8080/api/search/getRecentQueries',{headers:{'Authorization':localStorage.getItem('token')}})
    .then(res=>{
      setSearches(res.data.payload)
      axios.get('http://localhost:8080/api/genomeFavs/getFavs',{headers:{'Authorization':localStorage.getItem('token')}})
      .then(res=>setUserFavs(res.data.payload))
      .catch(e=>console.log(e))
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
            getData()
          }
  }}
      />
      {
        recentSearches?.length?(
          <>
          <Divider textAlign="left" sx={{color:'grey',marginTop:'15px',marginBottom:'15px'}}>Recent searches</Divider>
          <Container>
          <Container sx={{        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",gap: '5px'}}>
          {
            recentSearches?.map((query,i)=>(<Chip key={i} label={query} onClick={()=>setSearchInput(query)} />)
            )
          }
        </Container>
        </Container>
        </>
        ):(<></>)
      }
      {
        results?.length?(
          <Container  sx={{marginTop:'40px',display:'flex',justifyContent:'space-between',flexWrap:'wrap',maxHeight:'50vh'}}>
            {
              results.map(person=><UserProfile person={person}/>)
            }
          </Container>
        ):(<></>)
      }

    </Container>
    );
    
}
