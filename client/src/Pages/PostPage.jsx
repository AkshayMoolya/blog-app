import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState([]);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const data = await axios.get(`http://localhost:4000/post/${id}`);
    setPostInfo(data.data);
  };

  return (
    <div>
      <h1 className="font-bold my-2 text-2xl text-center">{postInfo.title}</h1>
      <span className="text-center block text-sm text-gray-500 mb-2">
        {postInfo.createdAt}
      </span>
      <div className="text-center mb-5 text-base font-bold ">
        by @{postInfo?.author?.username}
      </div>
      {userInfo?.id === postInfo?.author?._id && (
        <div className="text-center mb-2">
          <Link
            className="bg-gray-500 text-white px-7 py-4 inline-flex items-center gap-1 rounded-md "
            to={`/edit/${postInfo._id}`}
          >
            <span className="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </span>
            Edit this Post
          </Link>
        </div>
      )}
      <div className="max-h-[200px] flex overflow-hidden mb-4">
        <img
          className="object-center object-cover"
          src={`http://localhost:4000/${postInfo.cover}`}
          alt=""
        />
      </div>
      <div
        className="leading-6 text-gray-500"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
