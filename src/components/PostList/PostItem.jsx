import * as React from "react";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

const PostItem = ({ post }) => {
  const { title, thumbnail } = post;

  // TODO: post id 넣기
  const goDetail = () => {};

  return (
    <CardContainer>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={thumbnail}
            alt="photo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={goDetail}>
            view detail
          </Button>
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

export default PostItem;
