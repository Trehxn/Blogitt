import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import map from "lodash/map";

import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router-dom";
import requireAuth from "../hoc/requireAuth";

const getCombinedData = (posts, users) => {
  return posts.map((post) => {
    const { userId } = post;
    const foundUser = users.find((user) => user.id === userId);
    return {
      ...post,
      username: foundUser?.username,
    };
  });
};

const Posts = () => {
  const [computedData, setComputedData] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { data: posts } = useAxios({
    url: "/posts?_start=0&_limit=10",
  });

  const { data: users } = useAxios({
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
              item.username.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, posts, users]);

  return (
    <div className="container--accent posts">
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
          id="outlined-basic"
          label="Search posts"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {map(search ? computedData : getCombinedData(posts, users), (d) => {
        return (
          <div key={d.id} className="post">
            <div className="content">
              <h3>{d.title}</h3>
              <div>{d.body}</div>
            </div>
            <div
              className="username"
              onClick={() => {
                navigate(`/author/${d.userId}`);
              }}
            >
              -{d.username}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
