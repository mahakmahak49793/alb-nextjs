export const YYYYMMDD = (params: string | Date): string => {
    const date = new Date(params);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const get_date_value = (year: number = 18): string => {
    const currentDate = new Date();

    // Subtract years from the current date
    const previousYearsDate = new Date(currentDate);
    previousYearsDate.setFullYear(currentDate.getFullYear() - year);

    // Format the date as yyyy-mm-dd
    const formattedDate = previousYearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const HideDateFromCurrent = (year: number = 0): string => {
    const currentDate = new Date();

    // Subtract years from the current date
    const previousYearsDate = new Date(currentDate);
    previousYearsDate.setFullYear(currentDate.getFullYear() - year);

    // Format the date as yyyy-mm-dd
    const formattedDate = previousYearsDate.toISOString().split("T")[0];
    return formattedDate;
};

export const IndianRupee = (rupee: number | string): string => {
    const numericRupee = typeof rupee === 'string' ? parseFloat(rupee) : rupee;
    
    const Rupee = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    });

    return `${Rupee.format(numericRupee)}/-`;
};

export const DeepSearchSpace = <T>(data: T[] | null | undefined, searchText: string): T[] => {
    if (!data) return [];

    const normalizeText = (text: string): string => text.toLowerCase().replace(/\s+/g, '');

    const searchLower = normalizeText(searchText);

    const DeepSearchObject = (obj: any): boolean => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.values(obj).some((value: any) => DeepSearchObject(value));
        }
        if (Array.isArray(obj)) {
            return obj.some((value: any) => DeepSearchObject(value));
        }
        if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
            return normalizeText(obj.toString()).includes(searchLower);
        }
        return false;
    };

    return data.filter((item: T) => DeepSearchObject(item));
};

export const secondsToHMS = (duration: number | string): string => {
    const seconds = Math.floor(parseFloat(duration.toString()));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export const calculateAge = (dob: string | Date): number => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const dobMonth = dobDate.getMonth();
    const todayMonth = today.getMonth();

    if (todayMonth < dobMonth || (todayMonth === dobMonth && today.getDate() < dobDate.getDate())) {
        age--;
    }

    return age;
}