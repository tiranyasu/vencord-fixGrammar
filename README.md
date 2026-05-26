# FixGrammar — Vencord Plugin

A Vencord plugin that adds a chat bar button to instantly fix the grammar and punctuation of your Discord messages. Supports LanguageTool (free, no API key needed) or Gemini AI (better punctuation, requires a free API key).

## Features

- One-click grammar and punctuation correction
- Preserves your casual tone — it won't make you sound like a robot
- **LanguageTool** — works out of the box, no setup required
- **Gemini AI** — optional upgrade for better punctuation and sentence structure

## Preview

> **Before:** "hey its raining so hard outside i forgot my umbrella and im completely soaked its so cold"
>
> **After:** "Hey, it's raining so hard outside. I forgot my umbrella and I'm completely soaked. It's so cold!"

## Installation

### Prerequisites
- [Git](https://git-scm.com/downloads) installed on your system
- [Node.js](https://nodejs.org) installed on your system
- [pnpm](https://pnpm.io/installation) installed on your system
- Vencord installed from source — if you haven't done this yet, follow the [Vencord installation guide](https://docs.vencord.dev/installing/)

### Steps

1. Open a terminal as administrator and navigate to your Vencord `src/userplugins/` folder:

```bash
cd path/to/Vencord/src/userplugins
```

2. Clone this repo into the folder:

```bash
git clone https://github.com/tiranyasu/vencord-fixGrammar fixGrammar
```

3. Navigate back to the root Vencord folder and rebuild:

```bash
cd ../..
pnpm build
```

4. Reinject Vencord into Discord. You can do this by running:

```bash
pnpm inject
```

5. Fully close and relaunch Discord

6. Open Discord → User Settings → Vencord → Plugins → search for **FixGrammar** and enable it

## Setup

By default the plugin uses LanguageTool and requires no setup at all. Just enable it in Vencord settings and you're good to go.

If you want to use Gemini AI instead for better punctuation:

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Click **Get API key** and create a new key
4. In Discord, open Vencord settings → Plugins → find **FixGrammar** → set the backend to Gemini AI and paste your API key

No credit card required for the Gemini free tier.

## Usage

Once installed, you'll see an **Aa** button in the chat bar next to the translate button. Type your message and click it — your message will be corrected in place. Then send as normal.

## Notes

- When using Gemini AI, your message is sent to Google's API. Do not use this mode if you are sending sensitive information.
- The free Gemini API tier may be used by Google for model training. See [Google's privacy policy](https://policies.google.com/privacy) for details.
- This is an unofficial userplugin and is not affiliated with or endorsed by Vencord or Google.

## License

GPL-3.0-or-later