import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";

const Author = () => {
  const { id } = useParams();

  const { data } = useAxios({
    url: `/users/${id}`,
  });

  return (
    <div className="author container--accent thin">
      <div className="post">
        <div className="content">
          <h4>
            Name: <span>{data?.name}</span>
          </h4>
          <div>
            Address:
            <span>{data?.address?.suite + " , " + data?.address?.street}</span>
          </div>
          <div>
            Email: <span>{data?.email}</span>
          </div>
          <div>
            Phone: <span>{data?.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
