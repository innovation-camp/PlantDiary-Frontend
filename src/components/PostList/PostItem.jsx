import * as React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PostItem = ({ post }) => {
  const { id, title, content, thumbnail, writer } = post;
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/post/${id}`);
  };

  const defaultImg =
    "https://res.cloudinary.com/dozq0lpef/image/upload/v1662544379/ektkcu58eevdmbwbntqw.jpg";

  return (
    <CardContainer>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail ? thumbnail : defaultImg}
            alt="photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={goDetail}>
            view detail
          </Button>
          <Nickname>🌱 {writer.nickname}</Nickname>
        </CardActions>
      </Card>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  /* height: 100vh; */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 1em;
`;

const Nickname = styled.div`
  text-align: right;
  margin-left: 5em;
`;

export default PostItem;
