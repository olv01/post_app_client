import { useCallback } from "react";
import { useCustomSearchParams } from "../../hooks/useCustumSearchParams";
import classes from "./PostListNavigation.module.css";

const PAGE_AMOUNT = parseInt(process.env.REACT_APP_NAVIGATION_PAGE_AMOUNT);

const PostListNavigation = (props) => {
  const { setPartialParam } = useCustomSearchParams();
  const currentFloor = Math.floor(props.currentPage / PAGE_AMOUNT - 0.01);
  const lastFloor = Math.floor(props.totalPage / PAGE_AMOUNT - 0.01);

  const getPageNumbers = useCallback((totalPage, currentFloor, lastFloor) => {
    if (lastFloor < 1) {
      // 1. first and last page
      return [...Array(totalPage + 1).keys()].slice(1);
    } else if (currentFloor === lastFloor) {
      // 2. last page
      return [...Array(totalPage - lastFloor * PAGE_AMOUNT + 1).keys()]
        .slice(1)
        .map((v) => v + currentFloor * PAGE_AMOUNT);
    } else {
      // 3. else
      return [...Array(PAGE_AMOUNT + 1).keys()]
        .slice(1)
        .map((v) => v + currentFloor * PAGE_AMOUNT);
    }
  }, []);

  const onClickHandler = (page) => {
    setPartialParam({ p: page });
  };

  return (
    <div className={classes.pagination}>
      {currentFloor !== 0 && (
        <button onClick={() => onClickHandler(currentFloor * 10)}>이전</button>
      )}
      {getPageNumbers(props.totalPage, currentFloor, lastFloor).map((page) => (
        <button
          className={`${props.currentPage === page ? classes.active : ""}`}
          onClick={() => onClickHandler(page)}
          key={page}
        >
          {page}
        </button>
      ))}
      {currentFloor !== lastFloor && lastFloor > 0 && (
        <button onClick={() => onClickHandler(currentFloor * 10 + 11)}>
          다음
        </button>
      )}
    </div>
  );
};

export default PostListNavigation;
