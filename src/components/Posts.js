import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import map from "lodash/map";

import useAxios from "../hooks/useAxios";
import { Link, useNavigate } from "react-router-dom";

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

  const {
    data: posts,
    loading,
    fetched,
  } = useAxios({
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
              item.title.includes(search) ||
              item.body.includes(search) ||
              item.username.includes(search)
          )
        );
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [search, posts, users]);

  // console.log(computedData);
  // console.log({ users: users, posts: data });

  console.log();

  return (
    <div className="container--accent posts">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {map(search ? computedData : getCombinedData(posts, users), (d) => {
        return (
          <div className="post">
            <div className="content">
              <h3>{d.title}</h3>
              <div>{d.body}</div>
            </div>
            <div
              className="username"
              onClick={() => {
                // navigate(`/author/${user.id}`);
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
