import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/src/utils/api';
import { Button } from '@/components/ui/button';

const UpdateDoctorForm = ({ doctorId }) => {
  const [profileData, setProfileData] = useState({
    description: '',
    category: '',
    headLine: '',
    consultationPrice: 0,
    weekDaysAvailableIds: [],
    dayTimesAvailableIds: [],
    isActive: true,
    imageUrl: '',
  });
  const [dayTimesOptions, setDayTimesOptions] = useState([]);
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
        const formatTime = (time) => {
          const [hour, minute] = time.split(':');
          const ampm = hour >= 12 ? 'PM' : 'AM';
          const formattedHour = hour % 12 || 12;
          return `${formattedHour}:${minute} ${ampm}`;
        };
        const dayTimes = response.data.dayTimes.map((time) => ({
          value: time.id,
          label: formatTime(time.startTime),
        }));
        const weekDays = response.data.weekDays.map((day) => ({
          value: day.id,
          label: day.name,
        }));

        setDayTimesOptions(dayTimes);
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

        setProfileData({
          description: doctor.description,
          category: doctor.category,
          headLine: doctor.headLine,
          consultationPrice: doctor.consultationPrice || 100,
          weekDaysAvailableIds: doctor.weekDays.map((day) => day.id),
          dayTimesAvailableIds: doctor.dayTimes.map((time) => time.id),
          isActive: doctor.isActive,
          imageUrl: doctor.imageUrl,
        });
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchBalance();
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

  const handleSelectChange = (selectedOptions, action) => {
    const { name } = action;
    setProfileData({
      ...profileData,
      [name]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
    });
  };

  const handleCategoryChange = (newValue) => {
    setProfileData({
      ...profileData,
      category: newValue ? newValue.value : '',
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

    try {
      await api.post('/Doctor/UpdateProfile', profileData, {
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
          <div className="lg:w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consultationPrice">
              Consultation Price
            </label>
            <input
              type="number"
              name="consultationPrice"
              value={profileData.consultationPrice}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weekDaysAvailableIds">
            Week Days Available
          </label>
          <Select
            isMulti
            name="weekDaysAvailableIds"
            options={weekDaysOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={weekDaysOptions.filter((option) =>
              profileData.weekDaysAvailableIds.includes(option.value)
            )}
            onChange={handleSelectChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dayTimesAvailableIds">
            Day Times Available
          </label>
          <Select
            isMulti
            name="dayTimesAvailableIds"
            options={dayTimesOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            value={dayTimesOptions.filter((option) =>
              profileData.dayTimesAvailableIds.includes(option.value)
            )}
            onChange={handleSelectChange}
          />
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
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Selected"
                className="w-32 h-32 object-cover"
              />
            </div>
          )}
          {uploading ? (
            <p>Uploading...</p>
          ) : (
            <button onClick={handleImageUpload} className="mt-2 text-primary mx-2" >
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
