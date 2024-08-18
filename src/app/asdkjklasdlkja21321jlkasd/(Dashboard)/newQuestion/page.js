"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  content: z.string().min(20, "Content must be at least 20 characters"),
  questionTagIds: z.array(z.number()).optional(),
  newTag: z.string().optional(),
});

const NewQuestion = ({ token }) => {
  const [availableTags, setAvailableTags] = useState([]);
  const [newTagId, setNewTagId] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/Tags", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data && Array.isArray(response.data.tags)) {
          setAvailableTags(response.data.tags);
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
      questionTagIds: [],
      newTag: "",
    },
  });

  const onSubmit = async (data) => {
    const requestData = {
      title: data.title,
      content: data.content,
      questionTagIds: data.questionTagIds,
    };

    try {
      await api.post("/Question", requestData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Question submitted successfully");
      form.reset();
    } catch (error) {
      toast.error("Error submitting question data");
    }
  };

  const handleAddTag = async (newTag) => {
    if (newTag && !availableTags.find((tag) => tag.name === newTag)) {
      try {
        const response = await api.post("/Tags/create", { name: newTag }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const addedTag = { id: response.data.id, name: newTag };
        setAvailableTags([...availableTags, addedTag]);
        form.setValue("questionTagIds", [...form.getValues("questionTagIds"), addedTag.id]);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto">
          <FormField
            control={form.control}
            name="title"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" type="text" {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input placeholder="Content" type="text" {...field} />
                </FormControl>
                {fieldState.error && (
                  <FormMessage style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="questionTagIds"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <select
                    multiple
                    {...field}
                    onChange={(e) => {
                      const selectedIds = Array.from(e.target.selectedOptions, option => Number(option.value));
                      field.onChange(selectedIds);
                    }}
                    value={field.value || []}
                  >
                    <option value="" disabled>Select tags</option>
                    {availableTags.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </FormControl>
                {fieldState.error && (
                  <FormMessage style={{ color: "red" }}>
                    {fieldState.error.message}
                  </FormMessage>
                )}
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
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-black text-white font-bold">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default withAuth(NewQuestion);
