import { Fragment } from "react";
import { convertDateFormat } from "../../utils/convertDateFormat";
import classes from "./PostList.module.css";
import PostListItem from "./PostListItem";
import PostListNavigation from "./PostListNavigation";

const PostList = (props) => {
  return (
    <Fragment>
      <div className={classes.content}>
        <table>
          <thead>
            <tr>
              <td className={classes["th-id"]}>번호</td>
              <td>제목</td>
              <td className={classes["th-user"]}>작성자</td>
              <td className={classes["th-createdDate"]}>작성일</td>
            </tr>
          </thead>
          <tbody>
            {props.data.content.map((post) => {
              return (
                <PostListItem
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  username={post.username}
                  createdDate={convertDateFormat(post.createdDate)}
                  commentCount={post.commentCount}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={classes["content-bottom-nav"]}>
        <PostListNavigation
          currentPage={props.data.currentPage}
          totalPage={props.data.total}
        />
      </div>
    </Fragment>
  );
};

export default PostList;
