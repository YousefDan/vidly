import HeartFill from "../../icons/heart-fill.svg";
import Heart from "../../icons/heart.svg";

const Like = ({ isLiked, onLike }) => {
  return (
    <img
      style={{ cursor: "pointer" }}
      src={isLiked ? HeartFill : Heart}
      alt="like"
      onClick={onLike}
    />
  );
};

export default Like;
