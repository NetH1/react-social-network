import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getPosts } from "../../store/postsSlice";
import Button from "../../components/UI/Button";

function FeedPage() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)

  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts({ limit: 8, page }));
  }, [page]);

  const onPrev = () => {
    if(page === 1) return
    setPage(prev => prev - 1)
  }
  const onNext = () => {
    setPage(prev => prev + 1)
  }
  
  return (
    <div>
      <div>FeedPage</div>
      <div>
        <Button onClick={onPrev}>Prev</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
      <div>
        {posts?.length > 0 && posts.map((post) => (
          <div key={post.id}>
            <Link to={`post/${post.id}`}>
            {post.user && <div>{post.user.login}</div>}
            {post.image && <img src={post.image} alt="" />}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;
