import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getComments } from "../../redux/modules/commentSlice";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const CommentList = ({ postId }) => {
  const [commentList, setcommentList] = useState("");
  const dispatch = useDispatch();

  const comments = useSelector((store) => store.comment.comment);

  useEffect(() => {
    dispatch(getComments(postId));
  }, []);

  useEffect(() => {
    setcommentList(comments);
  }, [comments]);

  return (
    <CommentsConatiner>
      <CommentForm id={postId} />
      {commentList &&
        Array.from(commentList).map((comment) => {
          return (
            <CommentItem comment={comment} key={comment.id} postId={postId} />
          );
        })}
    </CommentsConatiner>
  );
};

const CommentsConatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 600px;
  margin: auto;
  border-radius: 0.3em;
`;

export default CommentList;
