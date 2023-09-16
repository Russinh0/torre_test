import { Avatar, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
const UserProfile = ({ person }) => {
  const [isFav, setFavVal] = useState(person.ardaId ? true : false);
  const handleButton = async () => {
    if (isFav) {
      try{
        const res = await axios.delete(
          "http://localhost:8080/api/genomeFavs/removeFav",
          { ardaId: person.ardaId },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        setFavVal(false);
      }
      catch(e){
        console.error(e)
      }
    } else {
      try{
        const res = await axios.post(
          "http://localhost:8080/api/genomeFavs/addFav",
          {
            ardaId: person.ardaId,
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
        sx={{ display: "flex", alignItems: "right", justifyContent: "right" }}
      >
        <Button
          onClick={() => handleButton()}
          variant="outlined"
          color="primary"
          sx={{ borderRadius: "10px" }}
        >
          {isFav ? (
            <Typography sx={{ color: "" }}>Unfollow</Typography>
          ) : (
            <Typography sx={{ color: "" }}>Follow</Typography>
          )}
        </Button>
      </Container>
    </Container>
  );
};

export default UserProfile;
