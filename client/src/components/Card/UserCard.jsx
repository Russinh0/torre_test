import { Avatar, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
const UserCard = ({ person }) => {
  console.log('esto USER PROFILE')
  const [isFav, setFavVal] = useState(person.isFav);
  const handleFavButton = async () => {
    if (isFav) {
      try{
        const res = await axios.delete(
          `http://localhost:8080/api/genomeFavs/removeFav/${person.username}`,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setFavVal(false);
      }
      catch(e){
        console.error(e)
      }
    } else {
      try{
        await axios.post(
          "http://localhost:8080/api/genomeFavs/addFav",
          {
            username: person.username,
            name: person.name,
            imageUrl: person.imageUrl,
            professionalHeadline: person.professionalHeadline,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setFavVal(true);
      }
      catch(e){
        console.error(e)
      }
    }
  };
  return (
    <Container
      sx={{
        paddingTop: "20px",
        position: "relative",
        height: "200px",
        width: "80%",
        background: "#27292d",
        marginBottom: "16px",
        borderRadius: "10px",
        justifyContent: "left",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        alignItems: "left",
      }}
    >
      <Avatar
        sx={{ height: "75px", width: "75px" }}
        alt={person.name}
        src={person.imageUrl}
      />

      <Typography>{person.name}</Typography>
      <Typography sx={{ color: "white", opacity: "0.6" }}>
        {person.professionalHeadline}
      </Typography>
      <Container
        sx={{ display: "flex", alignItems: "right", justifyContent: "right",width:'100%' }}
      >
        <Button
          onClick={() => handleFavButton()}
          variant="outlined"
          color="primary"
        
          sx={{ borderRadius: "10px",backgroundColor:{} }}
        >
          {isFav ? (
            <Typography sx={{ color: "#B7245C" }}>Unfollow</Typography>
          ) : (
            <Typography>Follow</Typography>
          )}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={()=>window.open(`https://torre.ai/${person.username}`, "_blank")}
          sx={{ borderRadius: "10px",marginLeft:'10px' }}
        >
            <Typography>Genome</Typography>

        </Button>
      </Container>
    </Container>
  );
};

export default UserCard;
