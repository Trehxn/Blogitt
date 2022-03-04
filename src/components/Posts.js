import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import map from "lodash/map";

import useAxios from "../hooks/useAxios";
import requireAuth from "../hoc/requireAuth";
import Modal from "./Modal";
import Author from "./Author";
import { CircularProgress } from "@mui/material";

const getCombinedData = (posts, users) => {
  return posts.map((post) => {
    const { userId } = post;
    const foundUser = users.find((user) => user.id === userId);
    return {
      ...post,
      user: foundUser,
    };
  });
};

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [computedData, setComputedData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: posts, loading: loadingPosts } = useAxios({
    url: "/posts?_start=0&_limit=10",
  });

  const { data: users, loading: loadingUsers } = useAxios({
    url: "/users",
  });

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search) {
        setComputedData(
          getCombinedData(posts, users).filter(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.body.toLowerCase().includes(search.toLowerCase()) ||
              item.user.username.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, posts, users]);

  return (
    <div className="posts">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "52%" },
          marginBlock: "2rem",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="search"
          id="outlined-basic"
          label="Search posts"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      {loadingPosts || loadingUsers ? (
        <CircularProgress />
      ) : (
        <>
          {map(search ? computedData : getCombinedData(posts, users), (d) => {
            return (
              <div key={d.id} className="post">
                <Typography
                  variant="h5"
                  component="div"
                  sx={{
                    flexGrow: 1,
                    textTransform: "uppercase",
                    mb: 1,
                  }}
                >
                  {d.title}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ flexGrow: 1, mb: 1 }}
                >
                  {d.body}
                </Typography>
                <div className="username">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(d);
                    }}
                  >
                    -{d.user?.username}
                  </Typography>
                </div>
              </div>
            );
          })}
        </>
      )}

      <Modal
        open={selectedPost ? true : false}
        onClose={() => setSelectedPost(null)}
      >
        <Author user={selectedPost?.user} />
      </Modal>
    </div>
  );
};

export default requireAuth(Posts);
