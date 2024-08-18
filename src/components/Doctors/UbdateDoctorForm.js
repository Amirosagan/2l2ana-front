import { useState, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '@/src/utils/api';

const UpdateDoctorForm = ({ doctorId }) => {
  const [profileData, setProfileData] = useState({
    description: '',
    category: '',
    headLine: '',
    consultationPrice: 0,
    weekDaysAvailableIds: [],
    dayTimesAvailableIds: [],
    isActive: true,
  });

  const [balance, setBalance] = useState(0);
  const [dayTimesOptions, setDayTimesOptions] = useState([]);
  const [weekDaysOptions, setWeekDaysOptions] = useState([]);

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
    const fetchBalance = async () => {
      try {
        const token = Cookies.get('authToken');
        const response = await api.get('/Doctor/Balance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBalance(response.data.amount);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get('authToken');

    try {
      const response = await api.post('/Doctor/UpdateProfile', profileData, {
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
      <div className="p-4 border-2 border-primary mt-5">
        <h1>
          <span className="text-primary text-lg mx-2">المحفظة :</span>
          {balance !== null ? `يوجد لديك ${balance} جنيه مصري حاليا` : 'جاري التحميل...'}
        </h1>
      </div>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="isActive">
            Active
          </label>
          <input
            type="checkbox"
            name="isActive"
            checked={profileData.isActive}
            onChange={handleChange}
            className="shadow appearance-none border rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded tajawal-bold hover:bg-primary-dark transition"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateDoctorForm;
