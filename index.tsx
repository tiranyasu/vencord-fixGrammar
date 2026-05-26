/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vencord contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import "./styles.css";

import { addMessagePreSendListener, removeMessagePreSendListener } from "@api/MessageEvents";
import definePlugin from "@utils/types";

import { checkGrammarWithGemini, checkGrammarWithLanguageTool } from "./api";
import { FixGrammarChatBarIcon, FixGrammarIcon } from "./FixGrammarIcon";
import { settings } from "./settings";

const preSendListener = async (channelId: string, messageObj: { content: string; }) => {
    if (!settings.store.autoFix || !messageObj.content) return;

    const { backend, language, apiKey, writingStyle } = settings.store;

    if (backend === "gemini" && !apiKey) return;

    try {
        const { backend, language, apiKey, writingStyle, geminiModel } = settings.store;
        // ...
        const corrected = backend === "gemini"
            ? await checkGrammarWithGemini(messageObj.content, apiKey, writingStyle, geminiModel)
            : await checkGrammarWithLanguageTool(messageObj.content, language);

        if (corrected !== messageObj.content) {
            messageObj.content = corrected;
        }
    } catch {
        // Silently fail so the message still sends
    }
};

export default definePlugin({
    name: "FixGrammar",
    description: "Adds a chat bar button to fix grammar in your message using LanguageTool or Gemini AI.",
    authors: [{ name: "tiranyasu", id: 362745133634158592n }],
    tags: ["Chat", "Utility"],
    settings,

    dependencies: ["MessageEventsAPI"],

    chatBarButton: {
        icon: FixGrammarIcon,
        render: FixGrammarChatBarIcon,
    },

    start() {
        addMessagePreSendListener(preSendListener);
    },

    stop() {
        removeMessagePreSendListener(preSendListener);
    },
});
