"use client";
import Profile from "@components/Profile";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const MyProfile = () => {
  const router = useRouter();
  const handleEdit = async(post) => {
     router.push(`/update-prompt?id=${post._id}`)
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
    if(hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });
        const filteredPosts = posts.filter((p) => p._id !== post._id) //updating the posts after filtering out the deleted post
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
   };
  const {data: session} = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if(session?.user?.id) fetchPosts();
  }, []);
  return (
    <Profile
      name="My Profile"
      desc="Welcome to your personalised profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
