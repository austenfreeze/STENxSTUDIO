// studio/src/theme.ts
import { buildLegacyTheme } from 'sanity'

const props = {
  '--my-white': '#e9e9e9',       // Dusty, muted white for minimal contrast
  '--my-black': '#0a0a0a',       // Deep black for backdrop
  '--my-blue': '#354b64',        // Smoky, muted navy blue
  '--my-red': '#c4453d',         // Muted crimson for punch
  '--my-yellow': '#b8a44a',      // Dirty gold for subtle accents
  '--my-green': '#49796b',       // Earthy green for muted highlights
  '--my-purple': '#5c3c63',      // Deep purple for regal accents
  '--my-burgundy': '#5e262b',    // Burgundy for richness
}

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': '#444',                 // Industrial dark gray for balance
  '--gray-base': '#333',            // Slightly darker for depth

  '--component-bg': props['--my-black'],           // Heavy black for components
  '--component-text-color': props['--my-white'],   // Subtle white text

  /* Brand */
  '--brand-primary': props['--my-purple'],         // Deep purple brand highlight

  // Buttons
  '--default-button-color': '#333',                        // Neutral, industrial
  '--default-button-primary-color': props['--my-blue'],    // Muted navy
  '--default-button-success-color': props['--my-green'],   // Earthy green
  '--default-button-warning-color': props['--my-yellow'],  // Subtle dirty gold
  '--default-button-danger-color': props['--my-red'],      // Burgundy red

  /* State */
  '--state-info-color': props['--my-blue'],
  '--state-success-color': props['--my-green'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--my-purple'],           // Brand pop for focus states
})
