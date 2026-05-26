/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { OptionType } from "@utils/types";

export const settings = definePluginSettings({
    autoFix: {
        type: OptionType.BOOLEAN,
        description: "Automatically fix grammar when you send a message",
        default: false,
    },
    backend: {
        type: OptionType.SELECT,
        description: "Which backend to use for grammar correction",
        options: [
            { label: "LanguageTool (Free, no API key required)", value: "languagetool", default: true },
            { label: "Gemini AI (Better punctuation, requires API key)", value: "gemini" },
        ] as const,
    },
    geminiModel: {
        type: OptionType.SELECT,
        description: "Which Gemini model to use. Flash-Lite has 1500 req/day free. Flash has a smaller daily quota but is smarter.",
        options: [
            { label: "Gemini 2.5 Flash-Lite (1500 req/day free, recommended)", value: "gemini-2.5-flash-lite", default: true },
            { label: "Gemini 2.5 Flash (smaller daily quota, smarter)", value: "gemini-2.5-flash" },
        ] as const,
    },
    writingStyle: {
        type: OptionType.SELECT,
        description: "Writing style preference for Gemini corrections",
        options: [
            { label: "Clean (minimal changes)", value: "clean", default: true },
            { label: "Stylish (polished and confident)", value: "stylish" },
            { label: "Formal (professional and polished)", value: "formal" },
        ] as const,
    },
    language: {
        type: OptionType.STRING,
        description: "Language code for LanguageTool (e.g. en-US, de-DE). Use 'auto' to detect automatically (less strict). Only used when backend is LanguageTool.",
        default: "en-US",
    },
    apiKey: {
        type: OptionType.STRING,
        description: "Gemini API key (get one free at aistudio.google.com). Only used when backend is Gemini AI.",
        default: "",
    },
});
