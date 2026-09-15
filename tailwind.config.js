/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
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
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			// Harsh — these map the tokens from globals.css into Tailwind
  			// class names. `bg-brand`, `text-sidebar-muted`, `border-sidebar-border`
  			// etc. all become available. The `<alpha-value>` bit is what lets
  			// `bg-brand/15` work.
  			brand: {
  				DEFAULT: 'hsl(var(--brand) / <alpha-value>)',
  				foreground: 'hsl(var(--brand-foreground) / <alpha-value>)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar) / <alpha-value>)',
  				foreground: 'hsl(var(--sidebar-foreground) / <alpha-value>)',
  				muted: 'hsl(var(--sidebar-muted) / <alpha-value>)',
  				accent: 'hsl(var(--sidebar-accent) / <alpha-value>)',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground) / <alpha-value>)',
  				border: 'hsl(var(--sidebar-border) / <alpha-value>)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		// Sidebar widths as named values so the sidebar and the content
  		// offset can't drift apart. One number, two consumers.
  		spacing: {
  			'sidebar': '16rem',
  			'sidebar-rail': '4.25rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
