import { useReducer, useEffect } from "react";
import axios from "../axios/axiosInstance";

const INITIAL_STATE = {
  loading: false,
  fetched: false,
  data: [],
  error: null,
};

const axiosReducer = (state, action) => {
  switch (action.type) {
    case "AXIOS_REQUEST_START":
      return {
        ...state,
        loading: true,
        fetched: false,
        data: [],
      };
    case "AXIOS_REQUEST_SUCCESS":
      return {
        ...state,
        loading: false,
        fetched: true,
        data: action.payload,
        error: null,
      };
    case "AXIOS_REQUEST_ERROR":
      return {
        ...state,
        loading: false,
        fetched: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useAxios = (params) => {
  const [state, dispatch] = useReducer(axiosReducer, INITIAL_STATE);

  const callAxios = async () => {
    dispatch({ type: "AXIOS_REQUEST_START" });
    try {
      console.log(params);
      const response = await axios(params);
      dispatch({ type: "AXIOS_REQUEST_SUCCESS", payload: response.data });
    } catch (err) {
      dispatch({
        type: "AXIOS_PROCESS_ERROR",
        payload: err,
      });
      console.log(err);
    }
  };

  useEffect(() => {
    if (!params.url && !params.data) return null;
    callAxios();
  }, [params.url]);

  return { ...state, callAxios };
};

export default useAxios;
