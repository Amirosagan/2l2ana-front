"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import api from "@/src/utils/api";
import withAuth from "@/src/utils/withAuth";

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  Tags: z.number(),
  newTag: z.string().optional(),
  featured: z.boolean().optional(),
});

const NewBlog = ({ token }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/Tags", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data.tags)) {
          const filteredTags = response.data.tags.filter(
            (tag) => tag.name !== "featured"
          );
          setAvailableTags(filteredTags);
        } else {
          setAvailableTags([]);
        }
      } catch (error) {
        setAvailableTags([]);
        toast.error("Failed to fetch tags");
      }
    };

    fetchTags();
  }, [token]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      Tags: undefined,
      newTag: "",
      featured: false,
    },
  });

  const onSubmit = async (data) => {
    if (!imageUrl) {
      toast.error("Image URL is not available");
      return;
    }

    const requestData = {
      title: data.title,
      content: data.content,
      imageUrl: imageUrl,
      tagIds: data.Tags ? [data.Tags] : [],
      featured: data.featured,
    };

    try {
      await api.post("/Post/add", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Form submitted successfully");
      form.reset();
      setImageUrl("");
      setImageFile(null);
    } catch (error) {
      if (error.response) {
        toast.error("Error submitting form data");
      }
    }
  };

  const handleAddTag = async (newTag) => {
    if (newTag && !availableTags.find((tag) => tag.name === newTag)) {
      try {
        const response = await api.post(
          "/Tags/create",
          { name: newTag },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const addedTag = { id: response.data.id, name: newTag };
        setAvailableTags([...availableTags, addedTag]);
        form.setValue("Tags", response.data.id);
        toast.success("Tag added successfully");
      } catch (error) {
        toast.error("Error adding new tag");
      }
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
            Authorization: `Bearer ${token}`,
          },
        });
        const imageUrl = uploadResponse.data.fileUrl;
        setImageUrl(imageUrl);
        toast.success("Image uploaded successfully");
      } catch (error) {
        toast.error("Error uploading image");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                <FormMessage className="text-red-500" />
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
            <FormMessage className="text-red-500" />
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
                    <option value="" disabled>
                      Select a tag
                    </option>
                    {availableTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add New Tag</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new tag" type="text" {...field} />
                </FormControl>
                <Button
                  type="button"
                  className="bg-transparent text-blue-800"
                  onClick={() => {
                    handleAddTag(field.value);
                    field.onChange(""); // Clear the input after adding the tag
                  }}
                >
                  Add Tag
                </Button>
                <FormMessage className="text-red-500" />
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
                    <input type="checkbox" {...field} checked={field.value} />
                    <span>Featured</span>
                  </label>
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {imageUrl && (
            <div className="w-full">
              <Image
                src={imageUrl}
                alt="Uploaded Image"
                width={300}
                height={200}
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-black text-white font-bold"
            disabled={!imageUrl}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(NewBlog);
