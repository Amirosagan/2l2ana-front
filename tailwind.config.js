/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b1b1b",
        light: "#fff",
        accent: "rgb(46 114 178)", 
        accentDark: "rgb(19 64 137)",
        admin1 : "rgb(31 143 160)",
        admin2 : "rgb(235 235 235)",
        primary : "rgb(31 143 160)",
        muted: '#f5f5f5',
        'muted-foreground': '#6b7280',
        background: '#ffffff',
        foreground: '#000000',
        ring: '#3b82f6',
        'ring-offset-background': '#f3f4f6',
      },
      fontFamily: {
        mr: ["var(--font-mr)"],
        in: ["var(--font-in)"],
        ta: ['var(--font-ta)'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
