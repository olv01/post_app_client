import { Link } from "react-router-dom";
import classes from "./PostListItem.module.css";

const PostListItem = (props) => {
  return (
    <tr>
      <td className={classes["item-id"]}>{props.id}</td>
      <td className={classes["item-title"]}>
        <Link to={`/posts/${props.id}`}>{props.title}</Link>
      </td>
      <td>{props.username}</td>
      <td>{props.createdDate}</td>
    </tr>
  );
};

export default PostListItem;
