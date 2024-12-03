import React,{useEffect,useState} from 'react'
import services from '../Appwrite/config'
import { Postcard } from '../Components'
import Container from '../Components/container/Container'
function AllPost() {
        const [posts,setPosts]=useState([])
        useEffect(()=>{
            services.getPosts([]).then((posts)=>{
                posts?setPosts(posts.documents):'';
            })
        },[])
       

    return (
        <div className=' w-full py-8'>
            <Container >
                <div className='flex flex-wrap'>
                {
                    posts.map((post)=>(
                        <div className=' p-2 w-1/4' key={post.$id}>
                            <Postcard {...post} />
                        </div>
                    ))
                }
                </div>
                </Container>
        </div>
    )
}

export default AllPost
