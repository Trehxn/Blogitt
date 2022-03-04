import { Typography } from "@mui/material";
import { Box } from "@mui/material";

const Author = ({ user: data }) => {
  return (
    <div className="author thin">
      <div className="post">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
            marginBlock: "2rem",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Name: <span>{data?.name}</span>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Address:
            <span>{data?.address?.suite + " , " + data?.address?.street}</span>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Email: <span>{data?.email}</span>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textTransform: "uppercase",
              mb: 1,
            }}
          >
            Phone: <span>{data?.phone}</span>
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Author;
