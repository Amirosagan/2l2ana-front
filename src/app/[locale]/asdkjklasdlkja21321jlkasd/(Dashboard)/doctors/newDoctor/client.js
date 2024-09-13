"use client";
import * as z from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string().length(11, "Phone number must be exactly 11 digits"),
});

const NewDoctorForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }
  });

  const handleSubmit = async (data) => {
    if (!imageUrl) {
      setErrorMessage("Please upload a profile picture.");
      return;
    }

    setRegistering(true); // Set registering state to true

    const requestData = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      profilePicture: imageUrl,
    };

    const token = Cookies.get('authToken');  // Retrieve the token from cookies

    try {
      await api.post("/Auth/register/doctor", requestData, {
        headers: {
          Authorization: `Bearer ${token}`,  // Include the token in the headers
        },
      });
      toast.success("Registration successful");
      form.reset();
      setImageUrl("");
      setImageFile(null);
      setErrorMessage("");
    } catch (error) {
      toast.error("There was an error with your registration. Please try again.");
    } finally {
      setRegistering(false); // Set registering state to false after the process is complete
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
        toast.success("Image uploaded successfully");
        setImageUrl(imageUrl);
      } catch (error) {
        toast.error("Error uploading image");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="flex justify-center w-full items-center mt-20 h-full">
      <ToastContainer />
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full p-5 m-auto">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input className="p-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input className="p-4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="p-4" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input className="p-4" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input className="p-4" {...field} />
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
                  className="mt-2"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <Button type="submit" className="w-full bg-primary p-7 flex text-white font-bold" disabled={registering}>
              {registering ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default NewDoctorForm;
