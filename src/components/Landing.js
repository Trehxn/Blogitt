import Typography from "@mui/material/Typography";

const Landing = () => {
  return (
    <Typography
      variant="h4"
      component="div"
      sx={{ flexGrow: 1, color: "#144372" }}
    >
      <div className="thick">
        <h1>Blogitt</h1>
        <h6>where all the blogs are litt..</h6>
      </div>
    </Typography>
  );
};

export default Landing;
