/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
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
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
				hide: {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				slideDownAndFade: {
					from: { opacity: "0", transform: "translateY(-6px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				slideLeftAndFade: {
					from: { opacity: "0", transform: "translateX(6px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				slideUpAndFade: {
					from: { opacity: "0", transform: "translateY(6px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				slideRightAndFade: {
					from: { opacity: "0", transform: "translateX(-6px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				accordionOpen: {
					from: { height: "0px" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				accordionClose: {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: { height: "0px" },
				},
				dialogOverlayShow: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				dialogContentShow: {
					from: {
						opacity: "0",
						transform: "translate(-50%, -45%) scale(0.95)",
					},
					to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
				},
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
				hide: "hide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideDownAndFade:
					"slideDownAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideLeftAndFade:
					"slideLeftAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideUpAndFade: "slideUpAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				slideRightAndFade:
					"slideRightAndFade 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				// Accordion
				accordionOpen: "accordionOpen 150ms cubic-bezier(0.87, 0, 0.13, 1)",
				accordionClose: "accordionClose 150ms cubic-bezier(0.87, 0, 0.13, 1)",
				// Dialog
				dialogOverlayShow:
					"dialogOverlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
				dialogContentShow:
					"dialogContentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  		}
  	}
  },
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/forms")],
}


