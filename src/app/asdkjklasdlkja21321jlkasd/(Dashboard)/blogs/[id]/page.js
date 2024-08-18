"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import withAuth from "@/src/utils/withAuth";
import api from '@/src/utils/api';
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  Tags: z.number().optional(),
  newTag: z.string().optional(),
  featured: z.boolean().optional(),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const SingleBlogPage = ({ params, token }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [featuredTagId, setFeaturedTagId] = useState(null);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await api.get(`/Post/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const tagResponse = await api.get("/Tags", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setBlogData(blogResponse.data);
        setAvailableTags(tagResponse.data.tags || []);
        setFeaturedTagId(tagResponse.data.tags.find(tag => tag.name === "featured")?.id || null);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, token]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blogData?.title || "",
      content: blogData?.content || "",
      Tags: blogData?.tags?.find(tag => tag.name !== "featured")?.id || undefined,
      featured: blogData?.tags?.some(tag => tag.name === "featured") || false,
    },
  });

  useEffect(() => {
    if (blogData) {
      form.reset({
        title: blogData.title,
        content: blogData.content,
        Tags: blogData.tags?.find(tag => tag.name !== "featured")?.id || undefined,
        featured: blogData.tags?.some(tag => tag.name === "featured") || false,
      });
      setImageUrl(blogData.imageUrl);
    }
  }, [blogData, form]);

  const handleSubmit = async (data) => {
    let tagIds = data.Tags ? [data.Tags] : [];
    if (data.featured && featuredTagId) {
      tagIds = [...tagIds, featuredTagId];
    } else {
      tagIds = tagIds.filter(tagId => tagId !== featuredTagId);
    }

    const requestData = {
      id,
      title: data.title,
      content: data.content,
      imageUrl: imageUrl,
      tagIds: tagIds,
    };

    try {
      await api.put(`/Post/update`, requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      // Handle error
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      try {
        const uploadResponse = await api.post("/Upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        });

        const imageUrl = uploadResponse.data.fileUrl;
        setImageUrl(imageUrl);
      } catch (error) {
        // Handle error
      } finally {
        setUploading(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <p><strong>ID:</strong> {blogData?.id}</p>
      <p><strong>Created At:</strong> {formatDate(blogData?.createdAt)}</p>
      <p><strong>Updated At:</strong> {formatDate(blogData?.updatedAt)}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={blogData?.title || "Enter title"} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <ReactQuill value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <div className="flex justify-around items-center py-3"> 
              <div>
                <FormControl>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                  />
                </FormControl>
              </div>
              <Button
                type="button"
                onClick={handleImageUpload}
                disabled={uploading || !imageFile}
                className="mt-2 text-white font-bold"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
            <FormMessage />
          </FormItem>
          <FormField
            control={form.control}
            name="Tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    value={field.value || ""}
                  >
                    <option value="" disabled>Select a tag</option>
                    {availableTags.filter(tag => tag.name !== "featured").map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...field}
                      checked={field.value}
                    />
                    <span>Featured</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-black text-white font-bold">
            Update
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(SingleBlogPage);
