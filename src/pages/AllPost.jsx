import React, { useEffect, useState } from 'react'
import services from '../Appwrite/config'
import { Postcard } from '../Components'
import Container from '../Components/container/Container'

function AllPost() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsData = await services.getPosts([])
                if (postsData) {
                    setPosts(postsData.documents)
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                </div>
            </Container>
        )
    }

    if (error) {
        return (
            <Container>
                <div className="text-center py-12 text-red-500">
                    Error loading posts: {error}
                </div>
            </Container>
        )
    }

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

export default AllPost