import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../components/UI/Input';
import Button from '../../components/UI/Button';
import { createPost } from '../../store/postsSlice';

const CreatePostPage = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const userId = user.id
    const [form, setForm] = useState({
        image:'',
        text:'',
    });
    const {image,text} = form
    const onChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]:value
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        dispatch(createPost({form,userId}))
        setForm({text:'',image:''})
      };
    return (
        <form onSubmit={onSubmit}>
            <Input value={image}
                onChange={onChange}
                name="image"
                label="image URL" />
                {/* <Input value={title}
                onChange={onChange}
                name="title"
                label="title" /> */}
                <Input value={text}
                onChange={onChange}
                name="text"
                label="text" />
                <Button type='sumbit'>Create</Button>
        </form>
    );
};


export default CreatePostPage;