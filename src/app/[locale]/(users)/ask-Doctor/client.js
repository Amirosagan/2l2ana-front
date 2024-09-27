"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/src/utils/api";
import { checkSession } from "@/src/utils/auth";
import { useTranslations } from 'next-intl'; // Import useTranslations for localization

const AskDoctor = () => {
    const t = useTranslations('AskDoctor'); // Use the 'AskDoctor' namespace for translations
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await api.get('/QuestionTag');
                setTags(response.data.questionTags);
            } catch (error) {
                console.error("Error fetching tags:", error);
            }
        };

        fetchTags();
    }, []);

    useEffect(() => {
        const success = searchParams.get("success");
        if (success) {
            setSubmitted(true);
        }
    }, [searchParams]);

    const validate = () => {
        const newErrors = {};
        if (!title) newErrors.title = t('errorTitle');
        if (!content) newErrors.content = t('errorContent');
        if (!selectedTag) newErrors.selectedTag = t('errorTag');
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const { session, token } = await checkSession();
        if (!session || !token) {
            console.error("User is not authenticated");
            return;
        }

        try {
            const response = await api.post("/Question", {
                title,
                content,
                questionTagIds: selectedTag ? [selectedTag] : [],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                router.push("?success=true");
            } else {
                console.error("Failed to submit question", response);
            }
        } catch (error) {
            console.error("Error submitting question:", error.response?.data || error.message);
        }
    };

    const handleNewQuestion = () => {
        setSubmitted(false);
        setTitle("");
        setContent("");
        setSelectedTag("");
        setErrors({});
        router.push("/ask-Doctor", undefined, { shallow: true });
    };

    if (submitted) {
        return (
            <div className="m-auto  lg:mx-[20%] mx-10">
                <div className="flex items-center mt-20 bg-neutral-200 p-10 rounded-xl shadow-xl gap-5 flex-col justify-center w-full m-auto">
                    <h1 className="lg:text-3xl text-xl mt-6 text-gray-500">
                        {t('successMessage')}
                    </h1>
                    <div className="flex gap-4 flex-col md:flex-row mt-10 w-full">
                        <Button onClick={handleNewQuestion} className="bg-primary hover:bg-primary/80 w-full flex px-7 py-4 button text-white">
                            {t('askAnotherQuestion')}
                        </Button>
                        <Link href="/booking-Doctor" className="w-full md:w-auto">
                            <Button className="bg-white hover:bg-white/50 w-full flex px-7 py-4 button text-primary">
                                {t('bookOnlineNow')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="m-auto mx-3 md:mx-10 -mt-16 md:mt-0 lg:mx-[20%]">
            <div className="flex items-center mt-10 bg-neutral-100 md:p-10 py-10 px-3 rounded-xl shadow-xl gap-5 flex-col justify-center w-full m-auto">
                <h1 className="lg:text-3xl text-2xl px-5 md:px-0"> {t('askYourQuestion')} </h1>
                <p className="text-gray-500 md:mb-12 px-5 md:px-0 text-center">
                    {t('description')}{' '}
                    <Link href="/booking-Doctor" className="text-accent text-lg tajawal-bold"> {t('talkToDoctorNow')} </Link>
                </p>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className="flex-grow w-full">
                        <Input
                            placeholder={t('questionTitlePlaceholder')}
                            className={`w-full button md:p-7 py-7 border-gray-500 ${errors.title ? 'border-red-500' : ''}`}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>
                    <div className="flex-shrink-0 w-full md:w-1/3">
                        <FormControl className="w-full" error={!!errors.selectedTag}>
                            <InputLabel id="tag-select-label" style={{ backgroundColor: 'white' }}>{t('selectTag')}</InputLabel>
                            <Select
                                labelId="tag-select-label"
                                value={selectedTag}
                                onChange={(e) => setSelectedTag(e.target.value)}
                                label={t('selectTag')}
                                style={{ direction: 'rtl', backgroundColor: 'white' }}
                            >
                                <MenuItem value="" disabled>{t('selectTagPlaceholder')}</MenuItem>
                                {tags
                                    .filter(tag => tag.name.toLowerCase() !== "feature")
                                    .map(tag => (
                                        <MenuItem key={tag.id} value={tag.id}>{tag.name}</MenuItem>
                                    ))}
                            </Select>
                            {errors.selectedTag && <FormHelperText>{errors.selectedTag}</FormHelperText>}
                        </FormControl>
                    </div>
                </div>
                <div className="w-full">
                    <Input
                        placeholder={t('questionContentPlaceholder')}
                        className={`w-full py-10 button ${errors.content ? 'border-red-500' : ''}`}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    {errors.content && <p className="text-red-500">{errors.content}</p>}
                </div>
                <p className="text-sm text-red-600"> {t('warning')} </p>
                <button
                    onClick={handleSubmit}
                    className="bg-primary  hover:bg-primary/80 w-full flex items-center justify-center px-7 py-4 button text-white"
                    type="button">
                    {t('submit')}
                </button>
                <p className="text-sm text-gray-500 text-center"> {t('emergencyMessage')} </p>
            </div>
        </div>
    );
}

export default AskDoctor;
