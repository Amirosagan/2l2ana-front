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
import { Link } from '@/src/i18n/routing';
import { checkSession } from "@/src/utils/auth";
import api from "@/src/utils/api";
import { useTranslations } from 'next-intl';

const getNextWeekDays = (daysOfWeek) => {
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

const formatEgyptTime = (date) => {
    return date.toLocaleTimeString("en-US", {
        timeZone: "Africa/Cairo",
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
};

export default function BookAppointment({ doctorId }) {
    const t = useTranslations(); // Fetch translations
    const daysOfWeek = [
        { value: 0, label: t('daysOfWeek.sunday') },
        { value: 1, label: t('daysOfWeek.monday') },
        { value: 2, label: t('daysOfWeek.tuesday') },
        { value: 3, label: t('daysOfWeek.wednesday') },
        { value: 4, label: t('daysOfWeek.thursday') },
        { value: 5, label: t('daysOfWeek.friday') },
        { value: 6, label: t('daysOfWeek.saturday') },
    ];

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
    const [freeTickets, setFreeTickets] = useState(0);
    const [bigFreeTickets, setBigFreeTickets] = useState(0);

    const nextWeekDays = getNextWeekDays(daysOfWeek);

    useEffect(() => {
        async function initializeSession() {
            const sessionData = await checkSession();
            if (sessionData) {
                setSession(sessionData.session);
                fetchFreeConsultationTickets();
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

            const validDays = daysOfWeek.filter(day =>
                doctorData.timesRanges.some(timeRange => timeRange.dayNumber === day.value)
            );

            const timeList = doctorData.timesRanges.map(time => ({
                time: time.time,
                dayNumber: time.dayNumber
            }));

            setTimeSlot(timeList);
            setAvailableDays(validDays);

            const firstAvailableDay = nextWeekDays.find(day => {
                if (!validDays.some(validDay => validDay.value === day.value)) {
                    return false;
                }
                const date = day.date;
                const hasAvailableTime = timeList.some(time =>
                    time.dayNumber === day.value && !isPastTime(date, time.time) && !isTimeUnavailable(date, time.time)
                );
                return hasAvailableTime;
            });

            if (firstAvailableDay) {
                setSelectedDay(firstAvailableDay.value);

                const firstAvailableTime = timeList.find(
                    time => time.dayNumber === firstAvailableDay.value
                );

                if (firstAvailableTime) {
                    setSelectedTimeSlot(firstAvailableTime.time);
                }
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

            const { freeTickets, bigFreeTickets } = response.data;
            setFreeTickets(freeTickets);
            setBigFreeTickets(bigFreeTickets);
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

    const handleBooking = async (isFree, isBigFree = false) => {
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
                isFree: isFree || isBigFree,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setIsFreeConsultation(isFree || isBigFree);
                setStep(3);

                if (isFree || isBigFree) {
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
                {t('BookAppointment.book')}
            </button>
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>{t('BookAppointment.book')}</DialogTitle>
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
                                                <CalendarDays /> {t('BookAppointment.selectDay')}
                                            </h2>
                                            <FormControl fullWidth>
                                                <InputLabel id="day-select-label">{t('BookAppointment.selectDay')}</InputLabel>
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
                                                <Clock /> {t('BookAppointment.selectTime')}
                                            </h2>
                                            <div className="grid grid-cols-3 gap-2">
                                                {timeSlot
                                                    .filter(item => item.dayNumber === selectedDay)
                                                    .map((item, index) => (
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
                                                                isPastTime(nextWeekDays.find(day => day.value === selectedDay)?.date, item.time) ||
                                                                isTimeUnavailable(nextWeekDays.find(day => day.value === selectedDay)?.date, item.time)
                                                            }
                                                        >
                                                            {formatEgyptTime(new Date(`${nextWeekDays.find(day => day.value === selectedDay)?.date.toDateString()} ${item.time}`))}
                                                        </Button>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-32 text-2xl tajawal-bold text-center">
                                        <h1>{t('BookAppointment.fullyBooked')}</h1>
                                        <Link className='flex items-center justify-center' href="/booking-Doctor">
                                            <button className='bg-primary hover:bg-primary/80 px-4 py-3 ml-5 text-xl rounded-md mt-5 text-white'>
                                                {t('BookAppointment.findAnotherDoctor')}
                                            </button>
                                        </Link>
                                    </div>
                                )
                            ) : (
                                <div className="mt-32 text-2xl tajawal-bold text-center">
                                    <h1>{t('BookAppointment.loginRequired')}</h1>
                                    <Link className='flex items-center justify-center' href="/login">
                                        <button className='bg-primary hover:bg-primary/80 px-4 py-3 ml-5 text-xl rounded-md mt-5 text-white'>
                                            {t('BookAppointment.login')}
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}

                    {step === 2 && (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <h2 className="mb-4 tajawal-medium text-accent">{t('BookAppointment.oneStepLeft')}</h2>
                            <p><strong>{t('BookAppointment.selectedDay')}:</strong> {nextWeekDays.find(day => day.value === selectedDay)?.label}</p>
                            <p><strong>{t('BookAppointment.selectedDate')}:</strong> {nextWeekDays.find(day => day.value === selectedDay)?.date.toLocaleDateString()}</p>
                            <p className='mb-10'><strong>{t('BookAppointment.selectedTime')}:</strong> {formatEgyptTime(new Date(`${nextWeekDays.find(day => day.value === selectedDay)?.date.toDateString()} ${selectedTimeSlot}`))}</p>
                            <div className='flex gap-4 flex-col items-center'>
                            {bigFreeTickets === 0 && (
                                <>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleBooking(false)}
                                    className="bg-accent text-white p-4"
                                >
                                    {t('BookAppointment.goToPayment')}
                                </Button>
                                </>
                            )}                 

                                {bigFreeTickets > 0 && (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleBooking(true, true)} 
                                            className=" bg-accent px-10 p-4 text-white"
                                        >
                                            {t('BookAppointment.free30Min')}
                                        </Button>
                                    </>
                                )}
                                {freeTickets > 0 && (
                                    <>
                                        <h1> {t('or')} </h1>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleBooking(true)}
                                            className="mb-2 bg-accent  text-white"
                                        >
                                            {t('BookAppointment.free10Min')}
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
                                    <h2 className="mb-4 tajawal-medium text-green-600">{t('BookAppointment.success')}</h2>
                                    <Link href="/my-bookings">
                                        <Button variant="contained" color="primary" className="bg-accent text-white">
                                            {t('BookAppointment.myBookings')}
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h2 className="mb-4 tajawal-medium text-green-600">{t('BookAppointment.paymentPending')}</h2>
                                    <Link href="/my-bookings">
                                        <Button variant="contained" color="primary" className="bg-accent text-white">
                                            {t('BookAppointment.myBookings')}
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
                                {t('close')}
                            </Button>
                            <Button
                                onClick={() => setStep(2)}
                                color="primary"
                                disabled={!(selectedDay !== null && selectedTimeSlot)}
                            >
                                {t('next')}
                            </Button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <Button
                                onClick={() => setStep(1)}
                                color="primary"
                            >
                                {t('back')}
                            </Button>
                        </>
                    )}
                    {step === 3 && (
                        <Button onClick={() => setOpen(false)} color="primary">
                            {t('close')}
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
