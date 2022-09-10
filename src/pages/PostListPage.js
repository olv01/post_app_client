import React, { useCallback, useEffect, useState } from "react";
import Spinner from "../components/Layout/Spinner";
import PostList from "../components/PostList/PostList";
import { usePost } from "../hooks/post-hooks";
import { useCustomSearchParams } from "../hooks/useCustumSearchParams";
import classes from "./PostListPage.module.css";

const PostListPage = () => {
  const [postListContent, setPostListContent] = useState({});
  const { searchParams, setPartialParam } = useCustomSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const { getPostList } = usePost();

  let paramPage = searchParams.get("p") || 1;

  const getPage = useCallback(() => {
    const re = /\d+$/;
    let m = re.exec(paramPage);

    if (m && m.index === 0 && m[0] > 0) {
      return parseInt(m[0]);
    }

    setPartialParam({ p: 1 });
    return 1;
  }, [paramPage, setPartialParam]);

  useEffect(() => {
    const page = getPage();

    const fetchData = async () => {
      const responseData = await getPostList(page - 1);

      if (responseData.total !== 0 && page > responseData.total) {
        setPartialParam({ p: 1 });
      } else {
        setPostListContent({ ...responseData, currentPage: page });
      }

      setIsLoading(false);
    };

    fetchData();
  }, [getPage, getPostList, setPartialParam]);

  return (
    <div className={classes.page}>
      {isLoading ? <Spinner /> : <PostList data={postListContent} />}
    </div>
  );
};

export default PostListPage;
