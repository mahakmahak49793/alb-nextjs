'use client';

import { useEffect, useState } from 'react';
import moment from 'moment';
import { X } from 'lucide-react';

interface Slot {
  _id: string;
  fromTime: string;
  toTime: string;
  duration: number;
  status: 'available' | 'booked';
}

interface SlotTimeByDateData {
  SlotDate: string;
  SlotTimeByDuration: {
    [key: string]: Slot[];
  };
}

interface ConsultationModalProps {
  isOpen: boolean;
  astrologerId: string | null;
  duration_minutes: number | null;
  consultation_type: string | null;
  bookingId: string | null;
  handleClose: () => void;
}

const ConsultationModal = ({
  isOpen,
  astrologerId,
  duration_minutes,
  consultation_type,
  bookingId,
  handleClose,
}: ConsultationModalProps) => {
  const [astrologerSlotDateData, setAstrologerSlotDateData] = useState<string[]>([]);
  const [astrologerSlotTimeByDateData, setAstrologerSlotTimeByDateData] =
    useState<SlotTimeByDateData | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (astrologerId && isOpen) {
      fetchSlotDates();
    }
  }, [astrologerId, isOpen]);

  useEffect(() => {
    if (astrologerId && astrologerSlotDateData.length > 0) {
      const firstDate = astrologerSlotDateData[0];
      setSelectedDate(firstDate);
      fetchSlotTimeByDate(firstDate);
    }
  }, [astrologerSlotDateData]);

  const fetchSlotDates = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        `http://localhost:3003/api/astrologers/get-slot-dates?astrologerId=${astrologerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setAstrologerSlotDateData(data.dates || []);
      }
    } catch (error) {
      console.error('Error fetching slot dates:', error);
    }
  };

  const fetchSlotTimeByDate = async (date: string) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        `http://localhost:3003/api/astrologers/get-slot-time-by-date?astrologerId=${astrologerId}&date=${date}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      
      if (data.success) {
        setAstrologerSlotTimeByDateData(data.slotData || null);
      }
    } catch (error) {
      console.error('Error fetching slot times:', error);
    }
  };

  const handleReschedule = async (slotId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to re-schedule this session?'
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const response = await fetch(
        'http://localhost:3003/api/customers/reschedule-booking',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookingId,
            newSlotId: slotId,
          }),
        }
      );

      const data = await response.json();

      if (data?.success) {
        alert(data?.message || 'Booking rescheduled successfully!');
        handleClose();
      } else {
        alert(data?.message || 'Failed to reschedule booking');
      }
    } catch (error) {
      console.error('Error rescheduling:', error);
      alert('An error occurred while rescheduling');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      <div className="relative bg-white rounded-lg w-[98vw] h-[95vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 py-4 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">
            Re Schedule Your <span className="capitalize">{consultation_type}</span>{' '}
            Consultation
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-10 overflow-y-auto">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-black mb-4">
              Available Slots Date
            </h2>

            <div className="flex items-center gap-3 overflow-x-auto pb-3">
              <div className="flex gap-3">
                {astrologerSlotDateData?.map((date, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedDate(date);
                      fetchSlotTimeByDate(date);
                    }}
                    className={`flex flex-col items-center py-1 w-20 rounded-md border transition text-xs ${
                      date === selectedDate
                        ? 'bg-[#26A040] text-white border-[#26A040]'
                        : 'border-gray-400 text-gray-700 hover:bg-[#26A040] hover:text-white hover:border-[#26A040]'
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {moment(date).format('DD MMM')}
                    </span>
                    <span className="text-xs font-semibold uppercase">
                      {moment(date).format('ddd')}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-semibold mb-3">
              Available Slots Time For your Booking of {duration_minutes} min
            </h3>

            <div className="space-y-8 overflow-x-auto pb-3">
              {duration_minutes &&
                astrologerSlotTimeByDateData &&
                astrologerSlotTimeByDateData.SlotTimeByDuration &&
                Array.isArray(astrologerSlotTimeByDateData.SlotTimeByDuration[duration_minutes + 'min']) &&
                astrologerSlotTimeByDateData.SlotTimeByDuration[duration_minutes + 'min'].length > 0 && (
                  <div className="flex gap-4 text-nowrap">
                    {astrologerSlotTimeByDateData.SlotTimeByDuration[duration_minutes + 'min'].map((slot, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-md shadow-md text-center font-medium text-sm transition ${
                          slot?.status === 'available'
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {slot?.fromTime} - {slot?.toTime}
                      </div>
                    ))}
                  </div>
                )}
            </div>

            {astrologerSlotTimeByDateData &&
            astrologerSlotTimeByDateData?.SlotTimeByDuration?.[
              duration_minutes + 'min'
            ]?.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {astrologerSlotTimeByDateData?.SlotTimeByDuration[
                  duration_minutes + 'min'
                ]?.map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white rounded-md shadow-md flex justify-between items-center"
                  >
                    <div>
                      <p className="text-black font-medium">
                        {slot?.fromTime} - {slot?.toTime}
                      </p>
                      <p className="text-sm text-gray-500">
                        Duration: {slot?.duration} Min
                      </p>
                    </div>

                    <button
                      onClick={() => handleReschedule(slot?._id)}
                      disabled={slot?.status !== 'available' || loading}
                      className={`px-3 py-1.5 text-xs rounded-full font-semibold transition ${
                        slot?.status === 'available'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {loading ? 'Processing...' : 'Proceed'}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 italic">No slots available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationModal;