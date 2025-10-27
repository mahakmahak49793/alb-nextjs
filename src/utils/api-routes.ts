// utils/api-routes.ts

// Auth routes
export const customer_login = 'api/customers/customer-login';
export const customer_login_otp = 'api/customers/verify_web_customer';
export const customer_update_profile = 'api/customers/update_profile_intake';
export const customer_change_picture = 'api/customers/change_profile';

export const astrologer_login = 'api/astrologer/astrologer_web_login';
export const user_logout = 'api/logout';

// User routes
export const get_user_customer_by_id = 'api/customers/get-customer-detail';
export const recharge_user_customer_wallet = 'api/customers/check_razorpay_payment_status';
export const get_user_customer_completed_queue_list = 'api/customers/get_customer_completed_queues';
export const update_user_customer_completed_queue_list_read_status = 'api/customers/update_queue_read_status';
export const get_user_customer_wallet_history = 'api/customers/get-customer-recharge-history';
export const get_user_customer_transaction_history = 'api/customers/customer_service_transaction_history_by_id';
export const get_user_customer_order_history = 'api/ecommerce/get_product_order_history';
export const get_user_customer_puja_book_history = 'api/puja/get_customer_booked_puja';
export const get_user_customer_address = 'api/puja/get_address_puja_by_customer';
export const create_user_customer_address = 'api/puja/add_address_puja';
export const update_user_customer_address = 'api/puja/update_address_puja';
export const delete_user_customer_address = 'api/puja/delete_address_puja';

// Consultation History - Customer
export const get_user_customer_consultation_history = (params: { customerId: string }) => 
  `api/customers/get_consultations/all?customerId=${params.customerId}`;

// Astrologer user routes
export const get_user_astrologer_by_id = 'api/astrologer/get-astrologer-details';
export const change_user_astrologer_chat_status = 'api/astrologer/change-chat-status';
export const change_user_astrologer_call_status = 'api/astrologer/change-call-status';
export const change_user_astrologer_video_call_status = 'api/admin/change_videocall_status';
export const user_astrologer_withdrawal_request = 'api/astrologer/withdraw_request';
export const get_user_astrologer_pending_queue_list = 'api/customers/get_astrologer_queues';
export const get_user_astrologer_completed_queue_list = 'api/customers/get_astrologer_message';
export const update_user_astrologer_pending_queue_list_status = 'api/customers/update_queue_status';
export const get_user_astrologer_wallet_history = 'api/admin/astrologer_transaction_histroy';
export const get_user_astrologer_transaction_history = 'api/astrologer/astrologer_service_transaction_history_by_id';
export const get_user_astrologer_registered_puja_history = 'api/puja/get_puja_register_by_astrolgerId';
export const get_user_astrologer_assigned_puja_history = 'api/puja/get_assign_by_astrologer';
export const get_user_astrologer_booked_puja_history = 'api/ecommerce/get_customer_booked_puja_by_astrologerId';
export const complete_booked_puja_history = 'api/ecommerce/complete_astrologer_pooja';

// Consultation History - Astrologer
export const get_user_astrologer_consultation_history = (params: { astrologerId: string }) => 
  `api/astrologer/get_astrologer-bookings?astrologerId=${params.astrologerId}`;

export const get_user_queue_predefined_message = 'api/admin/get_predefined_message';

// Consultation routes
export const get_slot_duration = 'api/admin/get_slots_duration';
export const create_user_astrologer_slots = 'api/astrologer/create_slots';

export const get_user_astrologer_slot_date = (params: { id: string }) => 
  `api/astrologer/get_slots_date/${params.id}`;

export const get_user_astrologer_slot_time_by_date = (params: { id: string; date: string }) => 
  `api/astrologer/get_slots/${params.id}/by-date?date=${params.date}`;

export const toggle_user_astrologer_slot_status = (params: { slotId: string }) => 
  `api/astrologer/update_slot_status/${params.slotId}/status`;

// Astrologer routes
export const get_astrologer = 'api/astrologer/astrologer_filter?page=1&limit=10';
export const get_astrologer_by_id = 'api/astrologer/get-astrologer-details';
export const get_astrologer_review_by_id = 'api/admin/get-astrologer-review';
export const get_astrologer_skill = 'api/admin/get-skill';
export const get_astrologer_main_expertise = 'api/admin/get-all-main-expertise';
export const follow_unfollow_astrologer = 'api/customers/follow_astrolgoer';
export const get_astrologer_followed_status_by_customer = 'api/customers/check_customer_following';

// Consultation - Astrologer
export const get_astrologer_slot_date = (params: { astrologerId: string }) => 
  `api/astrologer/get_slots_date/${params.astrologerId}`;

export const get_astrologer_slot_time_by_date = (params: { astrologerId: string; date: string }) => 
  `api/astrologer/get_slots_customer/${params.astrologerId}/by-date?date=${params.date}`;

export const book_consultation = 'api/customers/book_consultation';

// Chat routes
export const get_linked_profile_for_chat = 'api/customers/get-linked-profile';
export const create_profile_for_chat = 'api/customers/add-profile';
export const initiate_chat_message = 'api/customers/initiate-chat';

// Ecommerce routes
export const get_product_category = 'api/ecommerce/get_product_category';
export const get_products = 'api/ecommerce/get_products';
export const get_suggested_puja = 'api/puja/get_suggested_remedies';
export const get_puja = 'api/puja/get_puja';
export const get_customer_cart = 'api/puja/get_cart';
export const add_to_cart = 'api/puja/add_to_cart';
export const update_cart_item_quantity = 'api/puja/update_cart_quantity';
export const order_product = 'api/puja/book_puja';

// Puja routes
export const get_created_puja = 'api/puja/get_puja';
export const register_created_puja = 'api/puja/astro_register_for_puja';
export const get_approved_created_puja = 'api/puja/get_puja';
export const book_approved_created_puja = 'api/ecommerce/razorpay_payment_status_for_book_puja';

// Blog routes
export const get_astro_blog_category = 'api/admin/blog-category-list';

export const get_astro_blog = (
  page: number = 1, 
  limit: number = 10, 
  categoryId: string = '', 
  search: string = ''
) => 
  `api/customers/all_blogs?page=${page}&limit=${limit}&blogCategoryId=${categoryId}&search=${search}`;

export const get_astro_blog_details = 'api/customers/blog_detail';

export const increment_astro_blog_view_count = (blogId: string) => 
  `api/customers/increment_view_count/${blogId}`;

// Static page routes
export const get_terms_and_conditions = 'api/admin/get-terms-condition';
export const get_privacy_policy = 'api/admin/get-privacy-policy';
export const get_about_us = 'api/admin/get-about-us';

// Profile routes
export const create_kundli_matching_profile = 'api/customers/match_save';
export const get_kundli_matching_profile = 'api/customers/match_data';
export const get_kundli_matching_profile_by_id = 'api/customers/match_date_by_id';

// Astrology API routes
export const get_horoscope = 'api/horoscope/get_horoscope';
export const get_asthakoota = 'api/kundali/get_asthakoota_data';
export const get_astro_data = 'api/kundali/get_astro_data';

// Type definitions for route parameters
export interface RouteParams {
  customerId?: string;
  astrologerId?: string;
  id?: string;
  date?: string;
  slotId?: string;
  blogId?: string;
}

export interface BlogParams {
  page?: number;
  limit?: number;
  categoryId?: string;
  search?: string;
}
