/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IpcMainInvokeEvent } from "electron";

const LANGUAGETOOL_API = "https://api.languagetool.org/v2/check";

export async function checkGrammarLanguageTool(_: IpcMainInvokeEvent, text: string, language: string) {
    try {
        const res = await fetch(LANGUAGETOOL_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ text, language }),
        });

        return { status: res.status, data: await res.text() };
    } catch (e) {
        return { status: -1, data: String(e) };
    }
}

export async function checkGrammarGemini(_: IpcMainInvokeEvent, text: string, apiKey: string, writingStyle: string = "clean", model: string = "gemini-2.5-flash-lite") {
    const styleInstructions = {
        clean: "Fix only grammar, spelling, and punctuation errors. Preserve the original tone, style, slang, abbreviations, and casual nature. Do not rephrase or change the meaning.",
        stylish: "Fix grammar, spelling, and punctuation. Rewrite the message to sound calm, confident, and natural — like someone who knows what they want to say and says it well without trying too hard. Use contractions, vary sentence length, and cut any words that don't need to be there. Keep it casual enough for Discord but give it a clean, self-assured rhythm.",
        formal: "Fix grammar, spelling, and punctuation. Elevate the writing to be more professional and polished. You can improve phrasing for clarity and formality, but keep it appropriate for Discord.",
    } as const;

    const styleGuide = styleInstructions[writingStyle as keyof typeof styleInstructions] || styleInstructions.clean;

    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are a writing assistant for Discord messages. ${styleGuide} Important: preserve all Discord formatting exactly as-is, including bold (**text**), italics (*text*), underline (__text__), strikethrough (~~text~~), code blocks (\`code\`), emojis (both unicode and Discord custom like :smile:), spoiler tags (||text||), roleplay actions (*does something*), and any other special formatting. Work with and around these elements, never remove or alter them. Return ONLY the corrected message with no explanations, no quotes, and no additional markdown formatting:\n\n${text}`
                    }]
                }]
            }),
        });

        return { status: res.status, data: await res.text() };
    } catch (e) {
        return { status: -1, data: String(e) };
    }
}
