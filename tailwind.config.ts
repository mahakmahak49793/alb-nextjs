import { withUt } from "uploadthing/tw";
import type { Config } from "tailwindcss";

export default withUt({
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
        'marquee-slow': 'marquee 300s linear infinite',
        'marquee-right': 'marquee-right 20s linear infinite',
        rotate360: 'rotate360 10s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        rotate360: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      screens: {
        xxxs: '360px',
        xxs: '420px',
        xs: '500px',
        sm: '640px',
        md: '768px',
        lg: '1050px',
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1800px'
      },
      fontFamily: {
        arial: ['Arial', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        'sorts-mill-goudy': ['Sorts Mill Goudy', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif']
      },
      boxShadow: {
        custom: '0 4px 6px 10px rgba(0, 0, 0, 0.1), 0 2px 4px 10px rgba(0, 0, 0, 0.06)'
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #1D1A27, #3E5F8A)',
        'gold-gradient': 'linear-gradient(135deg, #FFEB85, #D4AF37)'
      },
      colors: {
        white: '#FEFEFE',
        'light-gray': '#E7E9F0',
        'dark-blue': '#051747',
        'custom-slate': '#535F80',
        'custom-purple': '#081F62',
        
        // Base theme
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: '#980d0d',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: '#D4AF37',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        
        // Cosmic theme
        cosmic: {
          blue: 'hsl(var(--cosmic-blue))',
          'blue-light': 'hsl(var(--cosmic-blue-light))',
          gold: 'hsl(var(--mystic-gold))',
          'gold-dark': 'hsl(var(--mystic-gold-dark))',
          glow: 'hsl(var(--star-glow))',
          'deep-space': 'hsl(var(--deep-space))',
          red: 'hsl(var(--cosmic-red))',
          'red-light': 'hsl(var(--cosmic-red-light))'
        },
        
        // Love Report theme (_lv suffix)
        background_lv: 'hsl(var(--background-lv))',
        foreground_lv: 'hsl(var(--foreground-lv))',
        border_lv: 'hsl(var(--border-lv))',
        input_lv: 'hsl(var(--input-lv))',
        ring_lv: 'hsl(var(--ring-lv))',
        
        card_lv: {
          DEFAULT: 'hsl(var(--card-lv))',
          foreground: 'hsl(var(--card-foreground-lv))'
        },
        popover_lv: {
          DEFAULT: 'hsl(var(--popover-lv))',
          foreground: 'hsl(var(--popover-foreground-lv))'
        },
        primary_lv: {
          DEFAULT: 'hsl(var(--primary-lv))',
          foreground: 'hsl(var(--primary-foreground-lv))'
        },
        secondary_lv: {
          DEFAULT: 'hsl(var(--secondary-lv))',
          foreground: 'hsl(var(--secondary-foreground-lv))'
        },
        muted_lv: {
          DEFAULT: 'hsl(var(--muted-lv))',
          foreground: 'hsl(var(--muted-foreground-lv))'
        },
        accent_lv: {
          DEFAULT: 'hsl(var(--accent-lv))',
          foreground: 'hsl(var(--accent-foreground-lv))'
        },
        destructive_lv: {
          DEFAULT: 'hsl(var(--destructive-lv))',
          foreground: 'hsl(var(--destructive-foreground-lv))'
        },
        'love-pink': {
          DEFAULT: 'hsl(var(--love-pink-lv))',
          foreground: 'hsl(var(--love-pink-foreground-lv))'
        },
        mystical: {
          DEFAULT: 'hsl(var(--mystical-lv))',
          foreground: 'hsl(var(--mystical-foreground-lv))'
        },
        'love-secondary': 'hsl(330 60% 45%)', // Additional love theme color
        
        // Navratri theme (_nr suffix)
        background_nr: 'hsl(var(--background-nr))',
        foreground_nr: 'hsl(var(--foreground-nr))',
        border_nr: 'hsl(var(--border-nr))',
        input_nr: 'hsl(var(--input-nr))',
        ring_nr: 'hsl(var(--ring-nr))',
        
        card_nr: {
          DEFAULT: 'hsl(var(--card-nr))',
          foreground: 'hsl(var(--card-foreground-nr))'
        },
        popover_nr: {
          DEFAULT: 'hsl(var(--popover-nr))',
          foreground: 'hsl(var(--popover-foreground-nr))'
        },
        primary_nr: {
          DEFAULT: 'hsl(var(--primary-nr))',
          foreground: 'hsl(var(--primary-foreground-nr))'
        },
        secondary_nr: {
          DEFAULT: 'hsl(var(--secondary-nr))',
          foreground: 'hsl(var(--secondary-foreground-nr))'
        },
        muted_nr: {
          DEFAULT: 'hsl(var(--muted-nr))',
          foreground: 'hsl(var(--muted-foreground-nr))'
        },
        accent_nr: {
          DEFAULT: 'hsl(var(--accent-nr))',
          foreground: 'hsl(var(--accent-foreground-nr))'
        },
        destructive_nr: {
          DEFAULT: 'hsl(var(--destructive-nr))',
          foreground: 'hsl(var(--destructive-foreground-nr))'
        },
        
        // Kundali Match theme (_km suffix) - if needed
        background_km: 'hsl(var(--background-km))',
        foreground_km: 'hsl(var(--foreground-km))',
        border_km: 'hsl(var(--border-km))',
        input_km: 'hsl(var(--input-km))',
        ring_km: 'hsl(var(--ring-km))',
        
        card_km: {
          DEFAULT: 'hsl(var(--card-km))',
          foreground: 'hsl(var(--card-foreground-km))'
        },
        popover_km: {
          DEFAULT: 'hsl(var(--popover-km))',
          foreground: 'hsl(var(--popover-foreground-km))'
        },
        primary_km: {
          DEFAULT: 'hsl(var(--primary-km))',
          foreground: 'hsl(var(--primary-foreground-km))'
        },
        secondary_km: {
          DEFAULT: 'hsl(var(--secondary-km))',
          foreground: 'hsl(var(--secondary-foreground-km))'
        },
        muted_km: {
          DEFAULT: 'hsl(var(--muted-km))',
          foreground: 'hsl(var(--muted-foreground-km))'
        },
        accent_km: {
          DEFAULT: 'hsl(var(--accent-km))',
          foreground: 'hsl(var(--accent-foreground-km))'
        },
        destructive_km: {
          DEFAULT: 'hsl(var(--destructive-km))',
          foreground: 'hsl(var(--destructive-foreground-km))'
        },
        
        // Charts
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        
        // Sidebar (if using)
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config);


// import { withUt } from "uploadthing/tw";
// import type { Config } from "tailwindcss";

// export default withUt({
//   darkMode: ["class"],
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       animation: {
//         marquee: 'marquee 10s linear infinite',
//       },
//       keyframes: {
//         marquee: {
//           '0%': { transform: 'translateX(0%)' },
//           '100%': { transform: 'translateX(-50%)' },
//         },
//       },
//       screens: {
//         'xxxs': '360px',  // Extra extra extra small devices
//         'xxs': '420px',   // Extra extra small devices  
//         'xs': '500px',    // Extra small devices
//       },
//       fontFamily: {
//       // Define a custom font family named 'arial'
//       arial: ['Arial', 'sans-serif'], 
//       },
//       colors: {
//         // Your custom direct hex colors
//         white: '#FEFEFE',
//         'light-gray': '#E7E9F0',
//         'dark-blue': '#051747',
//         'custom-slate': '#535F80', // Renamed to avoid conflict with Tailwind's slate
//         'custom-purple': '#081F62', // Renamed to avoid conflict
        
//         // System colors (typically from a UI library like Shadcn UI)
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         primary: {
//           DEFAULT: '#980d0d',
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: '#D4AF37',
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         chart: {
//           1: "hsl(var(--chart-1))",
//           2: "hsl(var(--chart-2))",
//           3: "hsl(var(--chart-3))",
//           4: "hsl(var(--chart-4))",
//           5: "hsl(var(--chart-5))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//     },
//   },
//   plugins: [require("tailwindcss-animate")],
// } satisfies Config);