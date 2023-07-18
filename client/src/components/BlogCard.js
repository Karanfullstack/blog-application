import * as React from "react";
import {styled} from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";

import axios from "axios";
const ExpandMore = styled((props) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme, expand}) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // Handel Edit

  const handelEdit = function () {
    navigate(`/blog-details/${id}`);
  };

  const handelDelete = async function () {
    try {
      const {data} = await axios.delete(`api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "45%",
        margin: "auto",
        marginTop: "50px",
        marginBottom: "50px",
        padding: 2,
        boxShadow: "3px 3px 10px #ccc",
        borderRadius: "30px",
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton sx={{marginLeft: "auto"}} onClick={handelEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handelDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
            {username}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={username}
        subheader={moment(time).calendar()}
      />
      <Typography variant="h5" marginBottom={2}>
        {title}
      </Typography>
      <CardMedia component="img" height="194" image={image} />

      <CardContent>
        <Typography variant="body2" color="text.secondary" lineHeight={2}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
