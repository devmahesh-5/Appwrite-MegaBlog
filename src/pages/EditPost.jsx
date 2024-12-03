import React, { useState,useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import services from '../Appwrite/config';
import Container from '../Components/container/Container';
import Postform from '../Components/post-form/Postform';

function EditPost() {
    const {slug}=useParams();
    const navigate = useNavigate();
    const [post,setPost]=useState(null);

    useEffect(()=>{
        if(slug){
            services.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                }
            })
        }
    },[slug,navigate])
    return (
        <div className='py-8'>
            <Container >
                <Postform post={post}/>
                </Container>
        </div>
    )
}

export default EditPost
