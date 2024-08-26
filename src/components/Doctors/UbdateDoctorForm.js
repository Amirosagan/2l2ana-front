import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/src/utils/api';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const UpdateDoctorForm = ({ doctorId }) => {
  const [profileData, setProfileData] = useState({
    description: '',
    category: '',
    headLine: '',
    consultationPrice: 0,
    weekDaysAvailable: [], // Array of objects containing dayId and selected timeIds
    isActive: true,
    imageUrl: '',
  });
  const [dayTimesOptions, setDayTimesOptions] = useState({});
  const [weekDaysOptions, setWeekDaysOptions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const categories = [
    { value: 'نساء وتوليد', label: 'نساء وتوليد' },
    { value: 'أمراض نساء', label: 'أمراض نساء' },
    { value: 'صحة المرأة', label: 'صحة المرأة' },
    { value: 'صحة نفسية', label: 'صحة نفسية' },
    { value: 'طب نفسي', label: 'طب نفسي' },
    { value: 'علاج نفسي', label: 'علاج نفسي' },
    { value: 'استشارات نفسية', label: 'استشارات نفسية' },
    { value: 'تأهيل نفسي', label: 'تأهيل نفسي' },
  ];

  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        const response = await api.get('/Time');

        // Function to format time to Egypt's local time
        const formatEgyptTime = (time) => {
          const date = new Date(`1970-01-01T${time}Z`);
          return date.toLocaleTimeString('en-US', {
            timeZone: 'Africa/Cairo',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          });
        };

        const groupedDayTimes = response.data.timesRanges.reduce((acc, timeRange) => {
          const dayId = timeRange.dayNumber;
          const formattedTime = formatEgyptTime(timeRange.time);
          const timeOption = { value: timeRange.id, label: formattedTime };

          if (!acc[dayId]) {
            acc[dayId] = [];
          }

          acc[dayId].push(timeOption);
          return acc;
        }, {});

        const weekDays = [
          { value: 0, label: 'Sunday' },
          { value: 1, label: 'Monday' },
          { value: 2, label: 'Tuesday' },
          { value: 3, label: 'Wednesday' },
          { value: 4, label: 'Thursday' },
          { value: 5, label: 'Friday' },
          { value: 6, label: 'Saturday' },
        ];

        setDayTimesOptions(groupedDayTimes);
        setWeekDaysOptions(weekDays);
      } catch (error) {
        console.error('Error fetching availability data:', error);
      }
    };

    const fetchDoctorData = async () => {
      if (!doctorId) return;

      try {
        const response = await api.get(`/Doctor/${doctorId}`);
        const doctor = response.data;

        // Map timesRanges to the correct format for the form
        const weekDaysAvailable = doctor.timesRanges.map((timeRange) => ({
          dayId: timeRange.dayNumber,
          timeIds: [timeRange.id], // Assuming each timeRange has a unique ID
        }));

        setProfileData({
          description: doctor.description,
          category: doctor.category,
          headLine: doctor.headLine,
          consultationPrice: doctor.consultationPriceAfterDiscount || 100,
          weekDaysAvailable,
          isActive: doctor.isActive,
          imageUrl: doctor.imageUrl,
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchAvailabilityData();
    fetchDoctorData();
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData({
      ...profileData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDayTimeChange = (selectedOptions, dayId) => {
    const updatedDays = profileData.weekDaysAvailable.map((day) =>
      day.dayId === dayId ? { ...day, timeIds: selectedOptions.map((option) => option.value) } : day
    );
    setProfileData({ ...profileData, weekDaysAvailable: updatedDays });
  };

  const handleAddDay = (dayId) => {
    setProfileData({
      ...profileData,
      weekDaysAvailable: [
        ...profileData.weekDaysAvailable,
        { dayId, timeIds: [] },
      ],
    });
  };

  const handleRemoveDay = (dayId) => {
    setProfileData({
      ...profileData,
      weekDaysAvailable: profileData.weekDaysAvailable.filter((day) => day.dayId !== dayId),
    });
  };

  const handleCategoryChange = (selectedOption) => {
    setProfileData({
      ...profileData,
      category: selectedOption ? selectedOption.value : '',
    });
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', imageFile);

      try {
        const uploadResponse = await api.post('/Upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = uploadResponse.data.fileUrl;
        toast.success('Image uploaded successfully');
        setProfileData({ ...profileData, imageUrl });
      } catch (error) {
        toast.error('Error uploading image');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');

    // Flatten the timesIds array from weekDaysAvailable
    const timesIds = profileData.weekDaysAvailable.reduce((acc, day) => {
      return acc.concat(day.timeIds);
    }, []);

    const payload = {
      isActive: profileData.isActive,
      description: profileData.description,
      category: profileData.category,
      headLine: profileData.headLine,
      consultationPrice: profileData.consultationPrice,
      imageUrl: profileData.imageUrl,
      timesIds: timesIds,  // This is the flattened array of time IDs
    };

    try {
      await api.post('/Doctor/UpdateProfile', payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="border-2 border-primary p-4 mt-5">
        <ToastContainer />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={profileData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row gap-4">
          <div className="lg:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category <span className="text-red-500 text-sm">اذا لم تجد تخصصك المطلوب قم بكتابته</span>
            </label>
            <CreatableSelect
              name="category"
              options={categories}
              className="basic-single"
              classNamePrefix="select"
              value={
                categories.find((option) => option.value === profileData.category) || {
                  value: profileData.category,
                  label: profileData.category,
                }
              }
              onChange={handleCategoryChange}
              isClearable
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="headLine">
            HeadLine
          </label>
          <input
            type="text"
            name="headLine"
            value={profileData.headLine}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Weekdays and Time Slots Section */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weekDaysAvailable">
            Select Days and Available Time Slots
          </label>

          {weekDaysOptions.map((day) => {
            const isSelected = profileData.weekDaysAvailable.some((d) => d.dayId === day.value);

            return (
              <div key={day.value} className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`day-${day.value}`}
                    checked={isSelected}
                    onChange={() => {
                      if (isSelected) {
                        handleRemoveDay(day.value);
                      } else {
                        handleAddDay(day.value);
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={`day-${day.value}`} className="block text-gray-700 text-sm font-bold mb-2">
                    {day.label}
                  </label>
                </div>

                {isSelected && (
                  <div className="ml-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Select Available Time Slots
                    </label>
                    <Select
                      isMulti
                      name={`dayTimesAvailable-${day.value}`}
                      options={dayTimesOptions[day.value] || []}
                      value={(dayTimesOptions[day.value] || []).filter((time) =>
                        profileData.weekDaysAvailable
                          .find((d) => d.dayId === day.value)
                          .timeIds.includes(time.value)
                      )}
                      onChange={(selectedOptions) =>
                        handleDayTimeChange(selectedOptions, day.value)
                      }
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imageUrl">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border border-gray-300 rounded p-2"
          />
          {imageFile && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Selected"
                className="w-32 h-32 object-cover"
                width={200}
                height={200}
              />
            </div>
          )}
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <button onClick={handleImageUpload} type="button" className="mt-2 text-primary mx-2">
              Upload Image
            </button>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isActive"
            checked={profileData.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="block text-gray-700 text-sm font-bold mb-2 mx-2" htmlFor="isActive">
            Active
          </label>
        </div>
        <Button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded mt-4">
          Update Profile
        </Button>
      </form>
    </>
  );
};

export default UpdateDoctorForm;
