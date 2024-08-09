"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AdminPage from "@/src/components/admin/getId/AdminPage";
import api from '@/src/utils/api';
import withAuth from '@/src/utils/withAuth';

const QuestionTagsPage = ({ token }) => {
  const [tagName, setTagName] = useState("");
  const [existingTags, setExistingTags] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const headers = ["Tag Name", "ID", "Action"];

  const fetchTags = useCallback(async () => {
    try {
      const response = await api.get("/QuestionTag", {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data && response.data.questionTags) {
        const questionTags = response.data.questionTags || [];
        const filteredTags = questionTags.filter(tag => tag.name.toLowerCase() !== "feature");
        setExistingTags(filteredTags);
      } else {
        throw new Error("Failed to fetch existing question tags");
      }
    } catch (error) {
      // Handle fetch error
    }
  }, [token]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags, refresh]);

  const handleAddTag = async () => {
    if (tagName.trim() === "") {
      // Handle empty tag name error
      return;
    }

    const tagExists = existingTags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());
    if (tagExists) {
      // Handle tag name already exists error
      return;
    }

    try {
      const response = await api.post("/QuestionTag", { name: tagName }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        setTagName("");
        setRefresh(prev => !prev);
      } else {
        throw new Error("Failed to add question tag");
      }
    } catch (error) {
      // Handle add tag error
    }
  };

  return (
    <div className="mt-5 p-5 rounded-xl bg-admin1">
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Add a New Question Tag</h2>
        <div className="flex gap-2">
          <Input
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            placeholder="Question tag name"
            className="p-3"
          />
          <Button
            onClick={handleAddTag}
            className="p-3 px-10 h-10 flex items-center bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Add Question Tag
          </Button>
        </div>
      </div>
      {existingTags.length > 0 ? (
        <AdminPage type="questionTags" apiUrl="/QuestionTag" headers={headers} refresh={refresh} />
      ) : (
        <p className="text-white">No question tags found. Please add a new question tag.</p>
      )}
    </div>
  );
};

export default withAuth(QuestionTagsPage);
