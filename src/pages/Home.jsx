import React,{useEffect,useState} from 'react'
import services from '../Appwrite/config'
import { Postcard } from '../Components'
import Container from '../Components/container/Container'
function Home() {
    const [posts,setPosts]=useState([])
    useEffect(()=>{
        services.getPosts([]).then((posts)=>{
            setPosts(posts.documents);
        })
    },[])
    if(posts.length===0){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div className='w-full py-8 '>
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
}

export default Home
