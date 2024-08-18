"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/src/utils/api";

const formSchema = z.object({
  commentContent: z.string().min(5, "Comment must be at least 5 characters"),
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const SingleQuestionPage = ({ params, token }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [questionData, setQuestionData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = params;

  const fetchData = async () => {
    try {
      const response = await api.get(`/Question/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestionData(response.data.question);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, token]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      commentContent: "",
    },
  });

  const handleCommentAndUpdate = async (data) => {
    if (questionData.comments && questionData.comments.length > 0) {
      toast.error("You can only add one Answer. Please delete the existing comment before adding a new one.");
      return;
    }

    setIsSubmitting(true);

    try {
      const commentResponse = await api.post(`/Comment`, {
        questionId: id,
        content: data.commentContent,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("The answer added successfully");

      await api.patch(`/Question`, {
        answered: true,
      }, {
        headers: { Authorization: `Bearer ${token}` },
        params: { QuestionId: id },
      });

      form.reset({ commentContent: "" });

      // Directly update the questionData state with the new comment
      setQuestionData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, commentResponse.data.comment],
      }));
    } catch (error) {
      toast.error("Error adding answer");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.delete(`/Comment`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { CommentId: commentId },
      });
      toast.success("Answer deleted successfully");

      // Remove the deleted comment from the state without refetching
      setQuestionData((prevData) => ({
        ...prevData,
        comments: prevData.comments.filter((comment) => comment.id !== commentId),
      }));
    } catch (error) {
      toast.error("Error deleting Answer");
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
      <p><strong>ID:</strong> {questionData?.id}</p>
      <p><strong>Title:</strong> {questionData?.title}</p>
      <p><strong>Content:</strong> {questionData?.content}</p>
      <p><strong>Created At:</strong> {formatDate(questionData?.date)}</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleCommentAndUpdate)} className="flex flex-col gap-4 w-[70%] mt-20 p-5 m-auto">
          <FormField
            control={form.control}
            name="commentContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add the Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Answer the question to show it public" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-black text-white font-bold" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Post"}
          </Button>
        </form>
      </Form>
      <div className="">
        {questionData.comments && questionData.comments.map((comment) => (
          <div key={comment.id} className="">
            <p>{comment.content}</p>
            <Button onClick={() => handleDeleteComment(comment.id)} className="bg-red-500 text-white">Delete Answer</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuth(SingleQuestionPage);
