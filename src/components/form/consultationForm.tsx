/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete } from '@react-google-maps/api';
import { z } from 'zod';

// Types for customer API response
interface CustomerApiResponse {
  success: boolean;
  message: string;
  customer: {
    customerName: string;
    email: string | null;
    dateOfBirth: string;
    timeOfBirth: string;
    birthPlace: string;
    phoneNumber: string;
  };
}

// Types for dynamic form configuration
interface FormFieldConfig {
  fieldName: keyof ConsultationFormData;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'time' | 'autocomplete' | 'textarea';
  required: boolean;
  placeholder?: string;
  disabled?: boolean;
  show?: boolean;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormConfiguration {
  fields: FormFieldConfig[];
  showDateOfBirth: boolean;
  showTimeOfBirth: boolean;
  showPlaceOfBirth: boolean;
  showConsultationTopic: boolean;
  customFields?: FormFieldConfig[];
}

// Define the form data type
type ConsultationFormData = {
  fullName?: string;
  email?: string;
  mobileNumber?: string;
  dateOfBirth?: string;
  timeOfBirth?: string;
  placeOfBirth?: string;
  consultationTopic?: string;
  dontKnowDOB?: boolean;
  dontKnowTOB?: boolean;
};

// Create dynamic schema
const createDynamicSchema = (config: FormConfiguration): z.ZodType<ConsultationFormData> => {
  const schemaFields: any = {
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email format"),
    mobileNumber: z.string().min(10, "Mobile number is required"),
    placeOfBirth: z.string().min(1, "Place of birth is required"),
    consultationTopic: z.string().min(1, "Topic is required"),
    dateOfBirth: z.string().optional(),
    timeOfBirth: z.string().optional(),
    dontKnowDOB: z.boolean().optional(),
    dontKnowTOB: z.boolean().optional(),
  };

  return z.object(schemaFields) as z.ZodType<any>;
};

// Default configuration
const defaultFormConfig: FormConfiguration = {
  fields: [
    { fieldName: 'fullName', label: 'Full Name', type: 'text', required: true, show: true, placeholder: 'Enter full name' },
    { fieldName: 'email', label: 'Email', type: 'email', required: true, show: true, placeholder: 'Enter email' },
    { fieldName: 'mobileNumber', label: 'Mobile', type: 'tel', required: true, show: true, placeholder: 'Enter mobile number', validation: { min: 10 } },
    { fieldName: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: false, show: true },
    { fieldName: 'timeOfBirth', label: 'Time of Birth', type: 'time', required: false, show: true },
    { fieldName: 'placeOfBirth', label: 'Place of Birth', type: 'autocomplete', required: true, show: true, placeholder: 'Enter place of birth' },
    { fieldName: 'consultationTopic', label: 'Topic', type: 'text', required: true, show: true, placeholder: "What you'd like to discuss" },
  ],
  showDateOfBirth: true,
  showTimeOfBirth: true,
  showPlaceOfBirth: true,
  showConsultationTopic: true,
};

interface ConsultationFormProps {
  onFormDataChange: (data: ConsultationFormData & { latitude?: number; longitude?: number }) => void;
  onValidationChange: (isValid: boolean) => void;
  astrologerId?: string;
}

const autocompleteOptions = {
  types: ['(cities)'],
  componentRestrictions: { country: 'IN' }
};

// **NEW: Helper functions to parse date and time from API response**
const parseDate = (dateString: string): string => {
  if (!dateString || dateString.trim() === '') return '';
  try {
    // Parse ISO datetime string and extract date part
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error parsing date:', error);
    return '';
  }
};

const parseTime = (timeString: string): string => {
  if (!timeString || timeString.trim() === '') return '';
  try {
    // Parse ISO datetime string and extract time part
    const date = new Date(timeString);
    if (isNaN(date.getTime())) return '';
    
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  } catch (error) {
    console.error('Error parsing time:', error);
    return '';
  }
};

// Get mobile number from localStorage
const getMobileNumber = (): string => {
  if (typeof window === 'undefined') return '';
  const mobile = localStorage.getItem('customer_phone');
  return (mobile && mobile.trim() && mobile !== 'null' && mobile !== 'undefined') ? mobile : '';
};

// Enhanced check for user login status
const isUserLoggedIn = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const customerId = localStorage.getItem('customer_id');
  const customerPhone = localStorage.getItem('customer_phone');
  const customerEmail = localStorage.getItem('customer_email');
  
  const hasValidId = !!(customerId && customerId.trim() && customerId !== 'null' && customerId !== 'undefined');
  const hasValidPhone = !!(customerPhone && customerPhone.trim() && customerPhone !== 'null' && customerPhone !== 'undefined');
  const hasValidEmail = !!(customerEmail && customerEmail.trim() && customerEmail !== 'null' && customerEmail !== 'undefined');
  
  return hasValidId && (hasValidPhone || hasValidEmail);
};

const getUserData = () => {
  if (typeof window === 'undefined') return {};
  
  const getData = (key: string) => {
    const value = localStorage.getItem(key);
    return (value && value.trim() && value !== 'null' && value !== 'undefined') ? value : '';
  };
  
  return {
    customer_id: getData('customer_id'),
    customer_name: getData('customer_name'),
    customer_phone: getData('customer_phone'),
    customer_email: getData('customer_email'),
  };
};

const getInitialData = (): Partial<ConsultationFormData> => {
  const userData = getUserData();
  
  return {
    fullName: userData.customer_name || '',
    email: userData.customer_email || '',
    mobileNumber: userData.customer_phone || '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    consultationTopic: '',
    dontKnowDOB: false,
    dontKnowTOB: false,
  };
};

const ConsultationForm: React.FC<ConsultationFormProps> = ({
  onFormDataChange,
  onValidationChange,
  astrologerId
}) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [placeDetails, setPlaceDetails] = useState({ latitude: 0, longitude: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [formConfig] = useState<FormConfiguration>(defaultFormConfig);
  const [isLoadingCustomer, setIsLoadingCustomer] = useState<boolean>(true);
  const [dynamicSchema] = useState(createDynamicSchema(defaultFormConfig));
  const [customerData, setCustomerData] = useState<CustomerApiResponse['customer'] | null>(null);
  const [fieldsToHide, setFieldsToHide] = useState<Set<string>>(new Set());
  
  // Use ref to prevent excessive notifications
  const notifyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastNotifiedDataRef = useRef<string>('');
  const hasInitialNotificationRef = useRef<boolean>(false);

  // Fetch customer data from API
  const fetchCustomerData = useCallback(async () => {
    const mobileNumber = getMobileNumber();
    if (!mobileNumber) {
      setIsLoadingCustomer(false);
      return;
    }

    try {
      setIsLoadingCustomer(true);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/customers/get-customer-by-mobile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: mobileNumber })
      });
      
      if (response.ok) {
        const data: CustomerApiResponse = await response.json();
        
        if (data.success && data.customer) {
          setCustomerData(data.customer);
          
          // Hide fields that have valid data from API
          const hideFields = new Set<string>();
          
          // Hide mobile number if exists
          if (data.customer.phoneNumber && data.customer.phoneNumber.trim()) {
            hideFields.add('mobileNumber');
          }
          
          // Hide email if exists and is not null
          if (data.customer.email && data.customer.email.trim() && data.customer.email !== 'null') {
            hideFields.add('email');
          }
          
          setFieldsToHide(hideFields);
        }
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    } finally {
      setIsLoadingCustomer(false);
    }
  }, []);

  // Check login status and fetch data on mount
  useEffect(() => {
    const loginStatus = isUserLoggedIn();
    setIsLoggedIn(loginStatus);
    fetchCustomerData();
  }, [fetchCustomerData]);

  // Create initial form data with parsed date and time
  const createInitialFormData = useCallback((): Partial<ConsultationFormData> => {
    const localData = getInitialData();
    
    if (customerData) {
      return {
        fullName: customerData.customerName || localData.fullName || '',
        email: customerData.email || localData.email || '',
        mobileNumber: customerData.phoneNumber || localData.mobileNumber || '',
        dateOfBirth: parseDate(customerData.dateOfBirth) || localData.dateOfBirth || '',
        timeOfBirth: parseTime(customerData.timeOfBirth) || localData.timeOfBirth || '',
        placeOfBirth: customerData.birthPlace || localData.placeOfBirth || '',
        consultationTopic: '',
        dontKnowDOB: false,
        dontKnowTOB: false,
      };
    }
    
    return localData;
  }, [customerData]);

  const form = useForm<ConsultationFormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: createInitialFormData(),
    mode: 'onChange'
  });

  const { register, setValue, trigger, formState: { errors, isValid }, watch, reset } = form;

  // Reset notification tracking when component mounts
  useEffect(() => {
    hasInitialNotificationRef.current = false;
    lastNotifiedDataRef.current = '';
    
    // Immediately notify parent with initial invalid state
    onValidationChange(false);
    onFormDataChange({ ...getInitialData(), ...placeDetails });
    
    return () => {
      if (notifyTimeoutRef.current) {
        clearTimeout(notifyTimeoutRef.current);
      }
    };
  }, []);

  // Update form when customer data changes
  useEffect(() => {
    if (!isLoadingCustomer) {
      const initialData = createInitialFormData();
      reset(initialData);
      
      if (customerData?.birthPlace) {
        setPlaceDetails({ latitude: 0, longitude: 0 });
      }
      
      hasInitialNotificationRef.current = false;
      lastNotifiedDataRef.current = '';
      
      // Notify parent immediately after reset
      setTimeout(() => {
        const formData = form.getValues();
        onFormDataChange({ ...formData, ...placeDetails });
        onValidationChange(form.formState.isValid);
      }, 100);
    }
  }, [customerData, isLoadingCustomer, createInitialFormData, reset]);

  // Debounced notification to parent
  const notifyParent = useCallback(() => {
    if (notifyTimeoutRef.current) {
      clearTimeout(notifyTimeoutRef.current);
    }

    notifyTimeoutRef.current = setTimeout(() => {
      const formData = form.getValues();
      const dataWithPlace = { ...formData, ...placeDetails };
      const dataString = JSON.stringify(dataWithPlace);
      
      lastNotifiedDataRef.current = dataString;
      onFormDataChange(dataWithPlace);
      onValidationChange(isValid);
      
      console.log('Form validation state:', isValid, 'Topic:', formData.consultationTopic);
    }, 300);
  }, [form, placeDetails, isValid, onFormDataChange, onValidationChange]);

  // Watch form changes with debouncing
  useEffect(() => {
    const subscription = watch(() => {
      notifyParent();
    });
    
    return () => {
      subscription.unsubscribe();
      if (notifyTimeoutRef.current) {
        clearTimeout(notifyTimeoutRef.current);
      }
    };
  }, [watch, notifyParent]);

  // Handle checkbox changes
  const handleCheckboxChange = useCallback((fieldName: 'dontKnowDOB' | 'dontKnowTOB', checked: boolean) => {
    setValue(fieldName, checked, { shouldValidate: true });
    
    if (checked) {
      if (fieldName === 'dontKnowDOB') {
        setValue('dateOfBirth', '', { shouldValidate: true });
      } else if (fieldName === 'dontKnowTOB') {
        setValue('timeOfBirth', '', { shouldValidate: true });
      }
    }
    
    setTimeout(() => trigger(), 50);
  }, [setValue, trigger]);

  const onLoad = useCallback((autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const latitude = place.geometry.location.lat();
        const longitude = place.geometry.location.lng();
        const placeOfBirth = place.formatted_address || '';
        
        setPlaceDetails({ latitude, longitude });
        setValue('placeOfBirth', placeOfBirth, { shouldValidate: true });
        
        setTimeout(() => {
          trigger('placeOfBirth');
        }, 50);
      }
    }
  }, [autocomplete, setValue, trigger]);

  // Check if field should be hidden
  const isFieldHidden = (fieldName: string): boolean => {
    return fieldsToHide.has(fieldName);
  };

  // Check if field should be readonly
  const isFieldReadOnly = (fieldName: string): boolean => {
    return fieldName === 'mobileNumber' && fieldsToHide.has(fieldName);
  };

  // **NEW: Helper to determine if Full Name should span full width**
  const shouldSpanFullWidth = (fieldName: string): boolean => {
    if (fieldName === 'fullName') {
      return isFieldHidden('email');
    }
    return false;
  };

  // Render individual field
  const renderField = (fieldConfig: FormFieldConfig) => {
    const { fieldName, label, type, required, placeholder, disabled, show } = fieldConfig;
    
    if (show === false || isFieldHidden(fieldName)) return null;

    const isReadOnly = isFieldReadOnly(fieldName) || disabled;
    const fieldError = errors[fieldName];

    switch (type) {
      case 'textarea':
        return (
          <div key={fieldName} className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <textarea
              {...register(fieldName)}
              placeholder={placeholder}
              readOnly={isReadOnly}
              className={`px-3 py-2 text-sm border rounded-lg focus:ring-[#980d0d] focus:border-transparent transition-all ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed text-gray-600' : 'bg-white'
              } ${fieldError ? 'border-red-500' : ''}`}
              rows={3}
            />
            {fieldError && (
              <p className="text-red-500 text-xs mt-1">{fieldError.message}</p>
            )}
          </div>
        );

      case 'autocomplete':
        if (fieldName !== 'placeOfBirth') return null;
        return (
          <div key={fieldName} className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <Autocomplete
              onLoad={onLoad}
              onPlaceChanged={onPlaceChanged}
              options={autocompleteOptions}
            >
              <input 
                {...register(fieldName)}
                placeholder={placeholder}
                autoComplete="off"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:ring-[#980d0d] focus:border-transparent transition-all ${
                  fieldError ? 'border-red-500' : ''
                } bg-white`}
              />
            </Autocomplete>
            {fieldError && (
              <p className="text-red-500 text-xs mt-1">{fieldError.message}</p>
            )}
          </div>
        );

      default:
        return (
          <div key={fieldName} className="grid gap-2">
            <label className="text-sm font-medium text-gray-700">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input 
              type={type}
              {...register(fieldName)}
              placeholder={placeholder}
              readOnly={isReadOnly}
              disabled={fieldName === 'dateOfBirth' && watch('dontKnowDOB') || fieldName === 'timeOfBirth' && watch('dontKnowTOB')}
              autoComplete="off"
              className={`px-3 py-2 text-sm border rounded-lg focus:ring-[#980d0d] focus:border-transparent transition-all disabled:bg-gray-100 ${
                isReadOnly ? 'bg-gray-100 cursor-not-allowed text-gray-600' : 'bg-white'
              } ${fieldError ? 'border-red-500' : ''}`}
            />
            {fieldError && (
              <p className="text-red-500 text-xs mt-1">{fieldError.message}</p>
            )}
          </div>
        );
    }
  };

  if (isLoadingCustomer) {
    return (
      <div className="bg-amber-50/50 p-4 rounded-lg border">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#980d0d]"></div>
          <span className="ml-2 text-sm text-gray-600">Loading your details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formConfig.fields
          .filter(field => field.show !== false && !isFieldHidden(field.fieldName))
          .map(field => {
            if (field.fieldName === 'dateOfBirth' && formConfig.showDateOfBirth && !isFieldHidden('dateOfBirth')) {
              return (
                <div key="dateOfBirth" className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    type="date"
                    {...register('dateOfBirth')}
                    disabled={watch('dontKnowDOB')}
                    className={`px-3 py-2 text-sm border rounded-lg focus:ring-[#980d0d] focus:border-transparent transition-all disabled:bg-gray-100 bg-white ${
                      errors.dateOfBirth ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="flex items-center mt-1">
                    <input 
                      type="checkbox"
                      checked={watch('dontKnowDOB')}
                      onChange={(e) => handleCheckboxChange('dontKnowDOB', e.target.checked)}
                      className="w-4 h-4 mr-2 rounded text-[#980d0d] focus:ring-[#980d0d]" 
                    />
                    <span className="text-xs text-gray-600">Don't know</span>
                  </div>
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              );
            }

            if (field.fieldName === 'timeOfBirth' && formConfig.showTimeOfBirth && !isFieldHidden('timeOfBirth')) {
              return (
                <div key="timeOfBirth" className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    type="time"
                    {...register('timeOfBirth')}
                    disabled={watch('dontKnowTOB')}
                    className={`px-3 py-2 text-sm border rounded-lg focus:ring-[#980d0d] focus:border-transparent transition-all disabled:bg-gray-100 bg-white ${
                      errors.timeOfBirth ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="flex items-center mt-1">
                    <input 
                      type="checkbox"
                      checked={watch('dontKnowTOB')}
                      onChange={(e) => handleCheckboxChange('dontKnowTOB', e.target.checked)}
                      className="w-4 h-4 mr-2 rounded text-[#980d0d] focus:ring-[#980d0d]" 
                    />
                    <span className="text-xs text-gray-600">Don't know</span>
                  </div>
                  {errors.timeOfBirth && (
                    <p className="text-red-500 text-xs mt-1">{errors.timeOfBirth.message}</p>
                  )}
                </div>
              );
            }

            // Full width for consultation topic
            if (field.fieldName === 'consultationTopic') {
              return (
                <div key={field.fieldName} className="md:col-span-2">
                  {renderField(field)}
                </div>
              );
            }

            // Full width for place of birth
            if (field.fieldName === 'placeOfBirth') {
              return (
                <div key={field.fieldName} className="md:col-span-2">
                  {renderField(field)}
                </div>
              );
            }

            // Conditional full width for Full Name
            if (field.fieldName === 'fullName') {
              return (
                <div key={field.fieldName} className={shouldSpanFullWidth('fullName') ? 'md:col-span-2' : ''}>
                  {renderField(field)}
                </div>
              );
            }

            return renderField(field);
          })}
      </div>
    </div>
  );
};

export default ConsultationForm;
