"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Image from 'next/image';
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
import customImageLoader from "@/src/utils/CustomLoader";
import api from "@/src/utils/api";

const formSchema = {
  blog: {
    title: {
      required: "Title is required",
      minLength: { value: 10, message: "Title must be at least 10 characters" },
    },
    content: {
      required: "Content is required",
      minLength: { value: 20, message: "Content must be at least 20 characters" },
    },
    Tags: {},
    newTag: {},
    featured: {},
  },
  video: {
    Title: {
      required: "Title is required",
      minLength: { value: 10, message: "Title must be at least 10 characters" },
    },
    url: {
      required: "URL is required",
      pattern: { value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, message: "Must be a valid URL" },
    },
    Tags: {},
    description: {},
    newTag: {},
    featured: {},
  },
};

const NewContent = ({ type }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [featuredTagId, setFeaturedTagId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/Tags");
        if (response.data && Array.isArray(response.data.tags)) {
          const filteredTags = response.data.tags.filter(tag => tag.name !== "featured");
          setAvailableTags(filteredTags);
          setFeaturedTagId(response.data.tags.find(tag => tag.name === "featured")?.id || null);
        } else {
          setAvailableTags([]);
        }
      } catch (error) {
        setAvailableTags([]);
      }
    };

    fetchTags();
  }, []);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: "",
      content: "",
      Tags: undefined,
      newTag: "",
      featured: false,
    },
  });

  const onSubmit = async (data) => {
    let tagIds = data.Tags ? [data.Tags] : [];
    if (data.featured && featuredTagId) {
      tagIds = [...tagIds, featuredTagId];
    }

    const requestData = {
      ...data,
      tagIds: tagIds,
      imageUrl: imageUrl,
    };

    try {
      if (type === "blog") {
        await api.post("/Post/add", requestData);
      } else if (type === "video") {
        await api.post("/Youtube/add", requestData);
      }
    } catch (error) {
      if (error.response) {
      }
    }
  };

  const handleAddTag = async (newTag) => {
    if (newTag && !availableTags.find((tag) => tag.name === newTag)) {
      try {
        const response = await api.post("/Tags/create", { name: newTag });
        const addedTag = { id: response.data.id, name: newTag };
        setAvailableTags([...availableTags, addedTag]);
        setValue("Tags", response.data.id);
      } catch (error) {
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
          },
        });
        const imageUrl = uploadResponse.data.fileUrl;
        setImageUrl(imageUrl);
      } catch (error) {
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <Form>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto">
          <FormField
            name={type === "blog" ? "title" : "Title"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{type === "blog" ? "Title" : "Title"}</FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...register(field.name, formSchema[type][field.name])} />
                </FormControl>
                <FormMessage>{errors[field.name]?.message}</FormMessage>
              </FormItem>
            )}
          />
          {type === "blog" && (
            <FormField
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <ReactQuill value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage>{errors.content?.message}</FormMessage>
                </FormItem>
              )}
            />
          )}
          {type === "video" && (
            <>
              <FormField
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Get the video link here with embed" type="text" {...register(field.name, formSchema[type][field.name])} />
                    </FormControl>
                    <FormMessage>{errors.url?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" type="text" {...register(field.name, formSchema[type][field.name])} />
                    </FormControl>
                    <FormMessage>{errors.description?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </>
          )}
          {type === "blog" && (
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
          )}
          <FormField
            name="Tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <select
                    {...register(field.name, formSchema[type][field.name])}
                    onChange={(e) => setValue(field.name, Number(e.target.value))}
                  >
                    <option value="" disabled>Select a tag</option>
                    {availableTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage>{errors.Tags?.message}</FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="newTag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add New Tag</FormLabel>
                <FormControl>
                  <Input placeholder="Add a new tag" type="text" {...register(field.name, formSchema[type][field.name])} />
                </FormControl>
                <Button
                  type="button"
                  className="bg-transparent text-blue-800"
                  onClick={() => {
                    handleAddTag(field.value);
                    setValue(field.name, ""); // Clear the input after adding the tag
                  }}
                >
                  Add Tag
                </Button>
              </FormItem>
            )}
          />
          <FormField
            name="featured"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(field.name, formSchema[type][field.name])}
                    />
                    <span>Featured</span>
                  </label>
                </FormControl>
                <FormMessage>{errors.featured?.message}</FormMessage>
              </FormItem>
            )}
          />
          {imageUrl && type === "blog" && (
            <div className="w-full">
              <Image
                loader={customImageLoader}
                src={imageUrl}
                alt="Uploaded Image"
                width={500}
                height={500}
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-black text-white font-bold" disabled={type === "blog" && !imageUrl}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default NewContent;
