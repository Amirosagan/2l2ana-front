"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  Tags: z.number().optional(),
  newTag: z.string().optional(),
});

const NewVideo = ({ token }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/Tags", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && Array.isArray(response.data.tags)) {
          const filteredTags = response.data.tags;
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
      description: "",
      Tags: undefined,
      newTag: "",
    },
  });

  const onSubmit = async (data) => {
    if (!videoUrl) {
      toast.error("Video URL is not available");
      return;
    }

    const requestData = {
      url: videoUrl,
      title: data.title,
      description: data.description,
      tagIds: data.Tags ? [data.Tags] : [],
    };

    try {
      await api.post("/Youtube/add", requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Video data submitted successfully");
      form.reset();
      setVideoUrl("");
    } catch (error) {
      if (error.response) {
        toast.error("Error submitting video data");
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description" type="text" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormItem>
            <FormControl>
              <Input
                placeholder="Paste video URL here"
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </FormControl>
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
                    field.onChange(""); 
                  }}
                >
                  Add Tag
                </Button>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white font-bold"
            disabled={!videoUrl}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(NewVideo);
