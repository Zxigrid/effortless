import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.jsx',
  ],

  theme: {
    extend: {
      colors: {
        'grey-steel': '#979797',
        'graphite': 'oklch(var(--graphite) / <alpha-value>)'
      },
      boxShadow: {
        'default': '0 0 15px',
        'default-small': '0 0 10.3px -2px'
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  daisyui: {
    themes: [
      {
        dashLight: {
          primary: "#3661EB",
          secondary: "#D24FCE",
          accent: "#FF589D",
          neutral: "#FFFFFF",
          "base-100": "#F4F4FF",
          info: "#0CD0C4",
          success: "#1CE50B",
          warning: "#E5B60B",
          error: "#E41212",
          '--graphite': "#303030",
        },
        dashDark: {
          primary: "#325ADB",
          secondary: "#D24FCE",
          accent: "#FF589D",
          neutral: "#222127",
          "base-100": "#2E2C39",
          info: "#0CD0C4",
          success: "#1CE50B",
          warning: "#E5B60B",
          error: "#E41212",
          '--graphite': "#D6D6D6",
        },
      },
    ],
  },

  plugins: [forms, daisyui],
};
