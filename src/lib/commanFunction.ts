import moment from "moment";
import { v4 as uuidv4 } from 'uuid';

// Type definitions
interface DateComponents {
    day: number;
    month: number;
    year: number;
    hour: number;
    min: number;
}

interface KundliDateTime extends DateComponents {
    lat: number;
    lon: number;
    tzone: number;
}

interface BirthDateData {
    birthDate: DateComponents & { minute: number };
    timezone: number;
}

interface Message {
    createdAt: string | Date;
    [key: string]: any;
}

interface GroupedMessages {
    [date: string]: Message[];
}

export const IndianRupee = (
    rupee: number,
    max: number = 2,
    min: number = 0
): string => {
    const Rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: max,
        minimumFractionDigits: min
    });

    return Rupee.format(rupee);
};

export const ParseDateTime = (dateStr: string, timeStr: string): Date => {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);

    return date;
};

export const DateDifference = (birthDate: string | Date): string => {
    const start = new Date(birthDate);
    const end = new Date();

    const diffMilliseconds = end.getTime() - start.getTime();

    const diffDate = new Date(diffMilliseconds);
    const years = diffDate.getUTCFullYear() - 1970;
    const months = diffDate.getUTCMonth();
    const days = diffDate.getUTCDate() - 1;

    if (years === 0 && months === 0) {
        return `${days}D`;
    } else if (years === 0 && months !== 0) {
        return `${months}M ${days}D`;
    }
    return `${years}Y ${months}M ${days}D`;
};

export const DayMonthYear = (params: string | Date): string => {
    const date = new Date(params);
    const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    return date.toLocaleDateString('en-GB', optionsDate);
};

export const DayMonthYearWithTime = (params: string | Date): string => {
    const date = new Date(params);
    const optionsDate: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    };

    return date.toLocaleString('en-GB', optionsDate);
};

export const OnlyTime = (params: string | Date): string => {
    const date = new Date(params);
    const optionsDate: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC'
    };

    return date.toLocaleString('en-GB', optionsDate);
};

export const YYYYMMDD = (params: string | Date): string => {
    const date = new Date(params);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const get_date_value = (): string => {
    const currentDate = new Date();

    const previous16YearsDate = new Date(currentDate);
    previous16YearsDate.setFullYear(currentDate.getFullYear() - 16);

    const formattedDate = previous16YearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const KundliFormatDateTime = (timestamp: string | Date): KundliDateTime => {
    const dateTime = moment.utc(timestamp);

    const day = dateTime.date();
    const month = dateTime.month() + 1;
    const year = dateTime.year();
    const hour = dateTime.hour();
    const min = dateTime.minute();
    const tzone = 5.5;

    console.log(day, month, year, hour, min, tzone);

    return { day, month, year, hour, min, lat: 19.132, lon: 72.342, tzone };
};

export function formatBirthDate(data: BirthDateData): string {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const { day, month, year } = data.birthDate;
    return `${months[month - 1]} ${day}, ${year}`;
}

export function formatBirthTime(data: BirthDateData): string {
    const { hour, minute } = data.birthDate;
    return `${hour}:${minute < 10 ? '0' + minute : minute} GMT+${data.timezone}`;
}

export const getShortDescription = (description?: string): string => {
    if (!description) return '';

    const words = description.trim().split(' ');
    const shortDescription = words.slice(0, 8).join(' ');

    return shortDescription;
};

export const DeepSearchSpace = <T extends Record<string, any>>(
    data: T[] | null | undefined,
    searchText: string
): T[] => {
    const normalizeText = (text: string): string => text.toLowerCase().replace(/\s+/g, '');

    const searchLower = normalizeText(searchText);

    const deepSearchObject = (obj: any): boolean => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some(value => deepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some(value => deepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return normalizeText(obj.toString()).includes(searchLower);
        }
        return false;
    };

    return data ? data.filter(item => deepSearchObject(item)) : [];
};

export const generateRandomNumber = (): string => {
    return uuidv4();
};

export const SecondToHMS = (duration: number | string): string => {
    const seconds = parseFloat(duration.toString()).toFixed(0);
    const totalSeconds = parseInt(seconds);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = Math.floor(totalSeconds % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export const CalculateTimeDifference = (date: string | Date): string => {
    const current_date = moment(new Date()).local();
    const upcoming_date = moment(date);
    const duration = moment.duration(upcoming_date.diff(current_date));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
};

export const GroupMessagesByDate = (msg?: Message[]): GroupedMessages => {
    if (!msg) return {};

    const grouped = msg.reduce((acc: GroupedMessages, message) => {
        const messageDate = moment(message.createdAt).format('YYYY-MM-DD');
        if (!acc[messageDate]) {
            acc[messageDate] = [];
        }
        acc[messageDate].push(message);
        return acc;
    }, {});

    return grouped;
};

export const dateTime = (
    year: number,
    month: number,
    day: number,
    hour: number,
    min: number
): Date => {
    return new Date(year, month - 1, day, hour, min);
};

export const KundliFormatDateAndTime = (
    dateOfBirth: string,
    timeOfBirth: string
): DateComponents => {
    const date = new Date(`${dateOfBirth}T${timeOfBirth}`);

    const day = parseInt(String(date.getDate()).padStart(2, '0'));
    const month = parseInt(String(date.getMonth() + 1).padStart(2, '0'));
    const year = date.getFullYear();
    const hour = parseInt(String(date.getHours()).padStart(2, '0'));
    const min = parseInt(String(date.getMinutes()).padStart(2, '0'));

    return { day, month, year, hour, min };
};

export const SecondToTimeFormat = (seconds: number): string => {
    const duration = moment.duration(seconds, 'seconds');
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const secs = duration.seconds();

    const formattedTime = `${hours}:${minutes}:${secs}`;
    return formattedTime;
};