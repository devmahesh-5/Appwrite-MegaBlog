import React, { useCallback } from 'react'
import services from '../../Appwrite/config';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Input, Button, Select,RTE } from '..';
function Postform({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await services.uploadFile(data.image[0]) : null;
            if (file) {
                await services.deleteFile(post.featuredimage);
            }
            const updatedPost = await services.updatePost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : undefined
            });
            if (updatedPost) {
                navigate(`/post/${post.$id}`);
            }
        } else {
            const file = data.image?.[0] ? await services.uploadFile(data.image[0]) : null;
            if (file) {
                data.featuredimage = file.$id;
                const newPost = await services.createPost({
                    ...data,
                    userid: userData.$id//userData is the all data of user who is logged in which is accesed by getCurrentUser function and stored in authslice from login component
                    
                });
                if (newPost) {
                    navigate(`/post/${newPost.$id}`);
                } 
            }else{
                console.log("error");
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string')
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        return '';
    }, [])
    React.useEffect(() => {
        const subscription = watch((value,{name}) => {//for optimization we use the variable and later unsubscribe it 
            //watch method watches the 'name'  everytime the value of 'name' changes
            //here value is value of input field and name is name of input field
                if(name==='title'){
                    setValue('slug',slugTransform(value.title,
                        {shouldValidate: true}
                    ));//set value of slug to slugTransform function and value of title as argument
                }
        });
        return ()=>{
            subscription.unsubscribe()
        };
    },[watch,setValue,slugTransform]);
    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}//now whenever we enter space in slug input field it changes to - under the hood and changes state
            />
            <RTE label="Content :" name="content" Control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={services.getFilePreview(post.featuredimage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}

export default Postform
