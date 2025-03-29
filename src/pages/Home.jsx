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
            <div className='w-full py-8'>
                <Container>
                    {posts.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            No posts found. Create your first post!
                        </div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {posts.map((post) => (
                                <Postcard key={post.$id} {...post} />
                            ))}
                        </div>
                    )}
                </Container>
            </div>
        )
    }
}

export default Home
