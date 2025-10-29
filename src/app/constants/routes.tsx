import {
    AnnouncementRouteSvg,
    AstrologerRouteSvg,
    BannerRouteSvg,
    BlogsRouteSvg,
    CustomerRouteSvg,
    GiftRouteSvg,
    HistoryRouteSvg,
    LanguageRouteSvg,
    LiveRouteSvg,
    MainExpertiesRouteSvg,
    NotificationRouteSvg,
    OtherRouteSvg,
    PoojaRouteSvg,
    RatingRouteSvg,
    RechargeRouteSvg,
    RemediesRouteSvg,
    SkillRouteSvg
} from '@/assets/svg';

interface SubRoute {
    path: string;
    name: string;
    icon: JSX.Element;
}

interface Route {
    path?: string;
    name: string;
    icon: JSX.Element;
    subRoutes?: SubRoute[];
}

export const RouteName: Route[] = [
    {
        path: "/",
        name: "Dashboard",
        icon: <OtherRouteSvg />,
    },
    {
        path: "/customer",
        name: "Customer",
        icon: <CustomerRouteSvg />,
    },
    {
        name: "Astrologer",
        icon: <AstrologerRouteSvg />,
        subRoutes: [
            {
                path: "/astrologer",
                name: "List Of Astrologers",
                icon: <AstrologerRouteSvg />,
            },
            {
                path: "/astrologer-enquiry",
                name: "Astrologer Enquiry",
                icon: <AstrologerRouteSvg />,
            },
            {
                path: "/astrologer-issues",
                name: "Astrologer Issues",
                icon: <AstrologerRouteSvg />,
            },
            {
                path: "/leave-request",
                name: "Leave request",
                icon: <AstrologerRouteSvg />,
            },
        ],
    },
    {
        name: "Astro Puja",
        icon: <PoojaRouteSvg />,
        subRoutes: [
            {
                path: "/astro-puja/category",
                name: "Category",
                icon: <PoojaRouteSvg />,
            },
            {
                path: "/astro-puja/puja",
                name: "Puja",
                icon: <PoojaRouteSvg />,
            },
            {
                path: "/astro-puja/puja-booked",
                name: "Puja Booked",
                icon: <PoojaRouteSvg />,
            },
        ],
    },
    {
        name: "Live Session",
        icon: <LiveRouteSvg />,
        subRoutes: [
            {
                path: "/live-session/category",
                name: "Category",
                icon: <LiveRouteSvg />,
            },
            {
                path: "/live-session/topic",
                name: "Topic",
                icon: <LiveRouteSvg />,
            },
        ],
    },
    {
        name: "Notification",
        icon: <NotificationRouteSvg />,
        subRoutes: [
            {
                path: "/customer-notification",
                name: "Customer Notification",
                icon: <NotificationRouteSvg />,
            },
            {
                path: "/astrologer-notification",
                name: "Astrologer Notification",
                icon: <NotificationRouteSvg />,
            },
        ],
    },
    {
        path: "/consultation",
        name: "Consultation",
        icon: <SkillRouteSvg />,
    },
    {
        path: "/skill",
        name: "Skill",
        icon: <SkillRouteSvg />,
    },
    {
        path: "/remedies",
        name: "Remedies",
        icon: <RemediesRouteSvg />,
    },
    {
        path: "/main-expertise",
        name: "Main Expertise",
        icon: <MainExpertiesRouteSvg />,
    },
    {
        path: "/gift",
        name: "Gift",
        icon: <GiftRouteSvg />,
    },
    {
        path: "/banner",
        name: "Banner",
        icon: <BannerRouteSvg />,
    },
    {
        path: "/recharge",
        name: "Recharge",
        icon: <RechargeRouteSvg />,
    },
    {
        path: "/review",
        name: "Review",
        icon: <RatingRouteSvg />,
    },
    {
        name: "Astroblog",
        icon: <BlogsRouteSvg />,
        subRoutes: [
            {
                path: "/astro-blog/category",
                name: "Category",
                icon: <BlogsRouteSvg />,
            },
            {
                path: "/astro-blog/blog",
                name: "Blog",
                icon: <BlogsRouteSvg />,
            },
        ],
    },
    {
        name: "Master",
        icon: <OtherRouteSvg />,
        subRoutes: [
            {
                path: "/master/slot-management",
                name: "Slot Management",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/master/platform-charges",
                name: "Platform Charge",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/master/predefined-message",
                name: "Predefined Message",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        name: "Pages",
        icon: <OtherRouteSvg />,
        subRoutes: [
            {
                path: "/pages/terms-and-conditions",
                name: "Terms and Conditions",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/privacy-policy",
                name: "Privacy Policy",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/about-us",
                name: "About Us",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/how-to-use-screenshots",
                name: "How to use- ScreenShots",
                icon: <OtherRouteSvg />,
            },
            {
                path: "/pages/how-to-use-videos",
                name: "How to use - Videos",
                icon: <OtherRouteSvg />,
            },
        ],
    },
    {
        path: "/reports/admin-earning",
        name: "Admin Earning",
        icon: <OtherRouteSvg />,
    },
    {
        path: "/language",
        name: "Language",
        icon: <LanguageRouteSvg />,
    },
    {
        path: "/announcement",
        name: "Announcement",
        icon: <AnnouncementRouteSvg fontSize="30px" />,
    },
];