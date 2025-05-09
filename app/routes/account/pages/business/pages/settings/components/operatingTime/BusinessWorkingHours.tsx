import React, { useEffect, useState } from 'react'
import { useNotification } from '~/context/NotificationContext';
import { saveOperatingHours } from '~/lib/Lib';

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
type WorkingHours = {
    [key in Day]: {
        start: string;
        end: string;
    };
};

const timeOptions = [
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30", "20:00"
];

type OpenStatus =
    | "no_hours"
    | "always_open"
    | "permanently_closed"
    | "temporarily_closed"
    | "selected_hours";

interface BusinessHours {
    day: string;
    open: string;
    close: string;
}

// Mock function to simulate API fetch
/* const fetchWorkingHours = async (): Promise<WorkingHours> => {
    // Replace with real API call
    return {
        Monday: { start: "08:30", end: "17:00" },
        Tuesday: { start: "08:30", end: "17:00" },
        Wednesday: { start: "08:30", end: "17:00" },
        Thursday: { start: "08:30", end: "17:00" },
        Friday: { start: "08:30", end: "17:00" },
        Saturday: { start: "09:00", end: "14:00" },
        Sunday: { start: "09:00", end: "14:00" },
    };
}; */

const BusinessWorkingHours = ({
    data,
    onChange,
    options
}: any) => {
    const [workingHours, setWorkingHours] = useState<WorkingHours | null>(null);
    const [openStatus, setOpenStatus] = useState<OpenStatus>("no_hours");
    const [working, setWorking] = useState(false)
    const notification = useNotification()

    const getWorkingHours = async (operatingHours: any) => {
        const hours = operatingHours
        return {
            Monday: { start: hours.monday_from, end: hours.monday_to },
            Tuesday: { start: hours.tuesday_from, end: hours.tuesday_to },
            Wednesday: { start: hours.wednesday_from, end: hours.wednesday_to },
            Thursday: { start: hours.thursday_from, end: hours.thursday_to },
            Friday: { start: hours.friday_from, end: hours.friday_to },
            Saturday: { start: hours.saturday_from, end: hours.saturday_to },
            Sunday: { start: hours.sunday_from, end: hours.sunday_to },
        };
    }

    useEffect(() => {
        const loadHours = async () => {

            const hours = await getWorkingHours(data.operatingHours);
            setWorkingHours(hours);
            onChange(hours)
            setOpenStatus(data.operatingHours.open_status)
        };
        loadHours();
    }, [data.operatingHours]);

    const handleTimeChange = (day: Day, type: "start" | "end", value: string) => {
        if (!workingHours) return;

        const startTime = type === "start" ? value : workingHours[day].start;
        const endTime = type === "end" ? value : workingHours[day].end;

        if (endTime <= startTime) {
            alert(`For ${day}, closing time must be later than opening time.`);
            return;
        }

        setWorkingHours({
            ...workingHours,
            [day]: {
                ...workingHours[day],
                [type]: value,
            },
        });

        onChange(workingHours)
    };

    const handleSave = async () => {



        if (openStatus === null) {

            notification.alert("", "Please select working hours.")
            return false;
        }
        setWorking(true)
        notification.notify()
        await new Promise((resolve) => setTimeout(resolve, 1000));

        try {
            const response: any = await saveOperatingHours(openStatus, workingHours, data.businessGuid, data.userGuid)

            if (response === undefined) {
                notification.alert("", "Save not successful!")
            }
        } catch (error: any) {

            notification.alert("", error.message)
        } finally {
            setWorking(false)
            notification.alert("", "Save successful!")
        }

    }

    if (!workingHours) return <p>Loading working hours...</p>;

    return (
        <div className="space-y-6">
            <div className={`w-full`}>
                {options.map((option: any) => (
                    <label
                        key={option.value}
                        className={`flex items-center gap-3 p-3 rounded cursor-pointer ${openStatus === option.value ? " bg-blue-50" : "border-gray-300"
                            }`}
                    >
                        <div className={`w-[20px]`}>
                            <input

                                type="radio"
                                name="openStatus"
                                value={option.value}
                                checked={openStatus === option.value}
                                onChange={() => setOpenStatus(option.value as OpenStatus)}
                                className={`accent-blue-600 w-[20px] h-[20px]`}
                            />
                        </div>
                        <div className={`flex flex-col`}>
                            <span className="text-gray-800">{option.label}</span>
                            <span className={`text-[13px] text-gray-500`}>
                                {option.more}
                            </span>
                        </div>
                    </label>
                ))}
            </div>

            {
                openStatus === "selected_hours" &&
                Object.keys(workingHours).map((day) => (
                    <div key={day} className="flex items-center gap-4">
                        <span className="w-24 font-semibold">{day}</span>
                        <select
                            value={workingHours[day as Day].start}
                            onChange={(e) => handleTimeChange(day as Day, "start", e.target.value)}
                            className="border p-2 rounded-md"
                        >
                            <option value="">From...</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                        <span>to</span>
                        <select
                            value={workingHours[day as Day].end}
                            onChange={(e) => handleTimeChange(day as Day, "end", e.target.value)}
                            className="border p-2"
                        >
                            <option value="">To...</option>
                            {timeOptions.map((time) => (
                                <option key={time} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}

            <div>
                <button
                    onClick={handleSave}
                    className={`mt-6 bg-blue-600 text-white px-6 py-2 
                            rounded hover:bg-blue-700 transition
                            shadow-md hover:shadow-lg hover:shadow-black/50`}
                >
                    {
                        working ? 'Saving...' : 'Save Business Hours'
                    }
                </button>
            </div>
        </div>
    )
}

export default BusinessWorkingHours
