"use client";
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import { CalendarDays, Clock } from 'lucide-react';
import Link from 'next/link';
import { checkSession } from "@/src/utils/auth";
import api from "@/src/utils/api";

const daysOfWeek = [
    { value: 0, label: "الأحد", englishName: "Sunday" },
    { value: 1, label: "الاثنين", englishName: "Monday" },
    { value: 2, label: "الثلاثاء", englishName: "Tuesday" },
    { value: 3, label: "الأربعاء", englishName: "Wednesday" },
    { value: 4, label: "الخميس", englishName: "Thursday" },
    { value: 5, label: "الجمعة", englishName: "Friday" },
    { value: 6, label: "السبت", englishName: "Saturday" },
];

const getNextWeekDays = () => {
    const today = new Date();
    const currentDayIndex = today.getDay();
    const orderedDaysOfWeek = [
        ...daysOfWeek.slice(currentDayIndex),
        ...daysOfWeek.slice(0, currentDayIndex)
    ];
    return orderedDaysOfWeek.map(day => {
        const date = new Date(today);
        const daysToAdd = (day.value - today.getDay() + 7) % 7;
        date.setDate(today.getDate() + daysToAdd);
        return { ...day, date };
    });
};

const formatDateTime = (date) => {
    return date.toISOString().split('.')[0];
};

export default function BookAppointment({ doctorId }) {
    const [open, setOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState(null);
    const [timeSlot, setTimeSlot] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [step, setStep] = useState(1);
    const [availableDays, setAvailableDays] = useState([]);
    const [notAvailableTimes, setNotAvailableTimes] = useState([]);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState("");
    const [isFreeConsultation, setIsFreeConsultation] = useState(false);
    const [bookingTrigger, setBookingTrigger] = useState(0);
    const [session, setSession] = useState(null);
    const [freeTickets, setFreeTickets] = useState(0); // Track free tickets

    const nextWeekDays = getNextWeekDays();

    useEffect(() => {
        async function initializeSession() {
            const sessionData = await checkSession();
            if (sessionData) {
                setSession(sessionData.session);
                fetchFreeConsultationTickets(); // Fetch free tickets on session initialization
            }
        }

        initializeSession();

        if (doctorId) {
            fetchDoctorData(doctorId);
            fetchNotAvailableConsultations(doctorId);
        }
    }, [doctorId]);

    useEffect(() => {
        if (bookingTrigger > 0) {
            fetchNotAvailableConsultations(doctorId);
        }
    }, [bookingTrigger]);

    const fetchDoctorData = async (id) => {
        try {
            const sessionData = await checkSession();
            if (!sessionData || !sessionData.session) {
                return;
            }

            const { token } = sessionData;
            const response = await api.get(`/Doctor/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const doctorData = response.data;

            const englishToArabic = Object.fromEntries(
                daysOfWeek.map(day => [day.englishName, day])
            );

            const validDays = doctorData.weekDays
                .map(day => englishToArabic[day.name])
                .filter(day => day !== undefined);

            const timeList = doctorData.dayTimes.map(time => ({
                time: time.startTime
            }));

            setTimeSlot(timeList);
            setAvailableDays(validDays);

            const firstAvailableDay = nextWeekDays.find(day => {
                if (!validDays.some(validDay => validDay.value === day.value)) {
                    return false;
                }
                const date = day.date;
                const hasAvailableTime = timeList.some(time => 
                    !isPastTime(date, time.time) && 
                    !isTimeUnavailable(date, time.time)
                );
                return hasAvailableTime;
            });

            if (firstAvailableDay) {
                setSelectedDay(firstAvailableDay.value);
            }
        } catch (error) {
            console.error('Error fetching doctor data:', error);
        }
    };

    const fetchNotAvailableConsultations = async (id) => {
        try {
            const sessionData = await checkSession();
            if (!sessionData || !sessionData.session) {
                return;
            }

            const { token } = sessionData;
            const response = await api.get(`/Consultation/GetNotAvailableConsultationsForDoctor`, {
                params: { DoctorId: id },
                headers: { Authorization: `Bearer ${token}` }
            });

            setNotAvailableTimes(response.data.dates);
        } catch (error) {
            console.error('Error fetching not available consultations:', error);
        }
    };

    const fetchFreeConsultationTickets = async () => {
        try {
            const sessionData = await checkSession();
            if (!sessionData || !sessionData.session) {
                return;
            }

            const { token } = sessionData;
            const response = await api.get(`/User/GetFreeConsultationTickets`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setFreeTickets(response.data.freeTickets);
        } catch (error) {
            console.error('Error fetching free consultation tickets:', error);
        }
    };

    const isPastTime = (selectedDate, time) => {
        const now = new Date();
        const selectedDateTime = new Date(selectedDate);
        const [hours, minutes, seconds] = time.split(':');
        selectedDateTime.setHours(parseInt(hours, 10));
        selectedDateTime.setMinutes(parseInt(minutes, 10));
        selectedDateTime.setSeconds(parseInt(seconds, 10));

        return selectedDateTime < now;
    };

    const isTimeUnavailable = (date, time) => {
        const dateTimeStr = formatDateTime(new Date(date));
        const [hours, minutes, seconds] = time.split(':');
        const dateTimeWithTime = new Date(dateTimeStr);
        dateTimeWithTime.setHours(parseInt(hours, 10));
        dateTimeWithTime.setMinutes(parseInt(minutes, 10));
        dateTimeWithTime.setSeconds(parseInt(seconds, 10));
        const formattedDateTimeWithTime = formatDateTime(dateTimeWithTime);
        return notAvailableTimes.some(unavailableDate => 
            formatDateTime(new Date(unavailableDate)) === formattedDateTimeWithTime
        );
    };

    const formatTime = (time) => {
        const [hours, minutes] = time.split(':');
        let period = 'AM';
        let formattedHours = parseInt(hours, 10);

        if (formattedHours >= 12) {
            period = 'PM';
            if (formattedHours > 12) {
                formattedHours -= 12;
            }
        } else if (formattedHours === 0) {
            formattedHours = 12;
        }

        return `${formattedHours}:${minutes} ${period}`;
    };

    const handleBooking = async (isFree) => {
        const sessionData = await checkSession();
        if (!sessionData || !sessionData.session) {
            return;
        }

        try {
            const selectedDateTime = nextWeekDays.find(day => day.value === selectedDay)?.date;
            const [hours, minutes, seconds] = selectedTimeSlot.split(':');
            selectedDateTime.setHours(parseInt(hours, 10));
            selectedDateTime.setMinutes(parseInt(minutes, 10));
            selectedDateTime.setSeconds(parseInt(seconds, 10));

            const offset = selectedDateTime.getTimezoneOffset();
            selectedDateTime.setMinutes(selectedDateTime.getMinutes() - offset);

            const formattedDateTime = formatDateTime(selectedDateTime);

            const { token } = sessionData;
            const response = await api.post("/Consultation", {
                doctorId: doctorId,
                dateTime: formattedDateTime,
                isFree,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setIsFreeConsultation(isFree);
                setStep(3); 

                if (isFree) {
                    const { consultation } = response.data;
                    setBookingSuccess(true);
                    setMeetingUrl(consultation.meetingUrl);
                } else {
                    const { paymentLink } = response.data;
                    if (paymentLink) {
                        window.open(paymentLink, '_blank');
                    }
                }

                setBookingTrigger(prev => prev + 1);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => {
                    setOpen(true);
                    setStep(1);
                    setBookingSuccess(false);
                    setSelectedTimeSlot(null); // Reset selected time slot when opening the dialog
                }}
                className='tajawal-bold bg-accent py-3 px-10 text-white rounded-md hover:bg-accent/90'
            >
                احجز معاد
            </button>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>احجز ميعاد</DialogTitle>
                <DialogContent 
                    style={{ 
                        minHeight: '400px', 
                        ...(step !== 1 ? { display: 'flex', alignItems: 'center', justifyContent: 'center' } : {}) 
                    }}
                >
                    {step === 1 && (
                        <>
                            {session ? (
                                availableDays.length > 0 && timeSlot.length > 0 ? (
                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col gap-3 items-baseline">
                                            <h2 className="flex gap-2 items-center">
                                                <CalendarDays /> اختر اليوم
                                            </h2>
                                            <FormControl fullWidth>
                                                <InputLabel id="day-select-label">اختر اليوم</InputLabel>
                                                <Select
                                                    labelId="day-select-label"
                                                    value={selectedDay !== null ? selectedDay : ''}
                                                    onChange={(event) => setSelectedDay(event.target.value)}
                                                >
                                                    {nextWeekDays
                                                        .filter(day => availableDays.some(ad => ad.value === day.value))
                                                        .filter(day => {
                                                            const date = nextWeekDays.find(d => d.value === day.value)?.date;
                                                            return date && timeSlot.some(time => !isPastTime(date, time.time) && !isTimeUnavailable(date, time.time));
                                                        })
                                                        .map(day => (
                                                            <MenuItem key={day.value} value={day.value}>
                                                                {day.label} - {day.date.toLocaleDateString()}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div>
                                            <h2 className="flex gap-2 items-center mb-3">
                                                <Clock /> اختر الوقت
                                            </h2>
                                            <div className="grid grid-cols-3 gap-2">
                                                {timeSlot.map((item, index) => (
                                                    <Button
                                                        key={index}
                                                        variant={item.time === selectedTimeSlot ? "contained" : "outlined"}
                                                        onClick={() => setSelectedTimeSlot(item.time)}
                                                        className={`${
                                                            item.time === selectedTimeSlot
                                                                ? 'bg-accent text-white'
                                                                : 'bg-white text-black'
                                                        }`}
                                                        disabled={
                                                            !nextWeekDays.find(day => day.value === selectedDay) ||
                                                            isPastTime(nextWeekDays.find(day => day.value === selectedDay)?.date, item.time) ||
                                                            isTimeUnavailable(nextWeekDays.find(day => day.value === selectedDay)?.date, item.time)
                                                        }
                                                    >
                                                        {formatTime(item.time)}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-32 text-2xl tajawal-bold text-center">
                                        <h1>كل المواعيد محجوزة ، تحب تشوف دكتور تاني؟</h1>
                                        <Link className='flex items-center justify-center' href="/booking-Doctor">
                                            <button className='bg-primary hover:bg-primary/80 px-4 py-3 ml-5 text-xl rounded-md mt-5 text-white'>
                                                اكتشف الدكاترة
                                            </button>
                                        </Link>
                                    </div>
                                )
                            ) : (
                                <div className="mt-32 text-2xl tajawal-bold text-center">
                                    <h1>يجب عليك تسجيل الدخول للمتابعة</h1>
                                    <Link className='flex items-center justify-center' href="/login">
                                        <button className='bg-primary hover:bg-primary/80 px-4 py-3 ml-5 text-xl rounded-md mt-5 text-white'>
                                            تسجيل الدخول
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <h2 className="mb-4 tajawal-medium text-accent">خطوة واحدة ونكمل الحجز</h2>
                            <p><strong>اليوم المختار:</strong> {nextWeekDays.find(day => day.value === selectedDay)?.label}</p>
                            <p><strong>التاريخ المختار:</strong> {nextWeekDays.find(day => day.value === selectedDay)?.date.toLocaleDateString()}</p>
                            <p className='mb-10'><strong >الوقت المختار:</strong> {formatTime(selectedTimeSlot)}</p>
                            <div className='flex gap-4 flex-col items-center'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleBooking(false)}
                                    className="bg-accent text-white p-4"
                                >
                                    30 دقيقة "اذهب الي منصة الدفع"
                                </Button>
                                {freeTickets > 0 && ( // Conditionally render the free consultation button
                                    <>
                                        <h1> أو </h1>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleBooking(true)}
                                            className="mb-2 bg-accent text-white"
                                        >
                                            10 دقائق مجاني
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            {isFreeConsultation ? (
                                <>
                                    <h2 className="mb-4 tajawal-medium text-green-600">مبروك ، تم الحجز بنجاح !</h2>
                                    <Link href="/my-bookings">
                                        <Button variant="contained" color="primary" className="bg-accent text-white">
                                            حجوزاتي
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h2 className="mb-4 tajawal-medium text-green-600">بعد اتمام الدفع ستجد الحجز والتفاصيل في حجوزاتي</h2>
                                    <Link href="/my-bookings">
                                        <Button variant="contained" color="primary" className="bg-accent text-white">
                                            حجوزاتي
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {step === 1 && session && (
                        <>
                            <Button onClick={() => setOpen(false)} color="primary">
                                اغلاق
                            </Button>
                            <Button
                                onClick={() => setStep(2)}
                                color="primary"
                                disabled={!(selectedDay !== null && selectedTimeSlot)}
                            >
                                التالي
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Button
                                onClick={() => setStep(1)}
                                color="primary"
                            >
                                رجوع
                            </Button>
                        </>
                    )}
                    {step === 3 && (
                        <Button onClick={() => setOpen(false)} color="primary">
                            اغلاق
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
