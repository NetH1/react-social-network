import React, {useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../store/getPostSlice';

const SinglePostPage = () => {
    const {postId} = useParams()
    const dispatch = useDispatch();

  const { post } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(postId));
  }, [postId]);
    return (
        <div>
          {post.text}
        </div>
    );
};


export default SinglePostPage;