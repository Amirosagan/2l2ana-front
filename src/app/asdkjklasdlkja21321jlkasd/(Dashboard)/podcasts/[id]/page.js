"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/src/utils/api";
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
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  audioUrl: z.string().url("Must be a valid URL"),
  description: z.string(),
  Tags: z.number().optional(),
  featured: z.boolean().optional(),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const SinglePodcastPage = ({ params, token }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [podcastData, setPodcastData] = useState(null);
  const [featuredTagId, setFeaturedTagId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const podcastResponse = await api.get(`/Podcast/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const tagResponse = await api.get("/Tags", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPodcastData(podcastResponse.data.podcast);
        setAvailableTags(tagResponse.data.tags || []);
        setFeaturedTagId(
          tagResponse.data.tags.find((tag) => tag.name === "featured")?.id ||
            null
        );
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
      title: "",
      audioUrl: "",
      description: "",
      Tags: undefined,
      featured: false,
    },
  });

  useEffect(() => {
    if (podcastData) {
      form.reset({
        title: podcastData.title,
        audioUrl: podcastData.audioUrl,
        description: podcastData.description,
        Tags:
          podcastData.tags?.find((tag) => tag.name !== "featured")?.id ||
          undefined,
        featured:
          podcastData.tags?.some((tag) => tag.name === "featured") || false,
      });
    }
  }, [podcastData, form]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    let tagIds = data.Tags ? [data.Tags] : [];
    if (data.featured && featuredTagId) {
      tagIds = [...tagIds, featuredTagId];
    } else {
      tagIds = tagIds.filter((tagId) => tagId !== featuredTagId);
    }

    const requestData = {
      id: podcastData.id,
      audioUrl: data.audioUrl,
      title: data.title,
      description: data.description,
      tagIds: tagIds,
    };

    try {
      await api.put(`/Podcast`, requestData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Podcast data updated successfully");
    } catch (error) {
      toast.error("Error updating podcast data");
    } finally {
      setIsSubmitting(false);
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
      <ToastContainer />
      <p>
        <strong>ID:</strong> {podcastData?.id}
      </p>
      <p>
        <strong>Created At:</strong> {formatDate(podcastData?.createdAt)}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="audioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audio URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter audio URL" />
                </FormControl>
                <FormMessage />
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
                  <Input {...field} placeholder="Enter description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    {availableTags
                      .filter((tag) => tag.name !== "featured")
                      .map((tag) => (
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
          <Button
            type="submit"
            className="w-full bg-black text-white font-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(SinglePodcastPage);
