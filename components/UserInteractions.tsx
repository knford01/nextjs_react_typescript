import { useState } from 'react';

//handle copying text to the clipboard when a user interacts with UI elements\\
export const handleCopyToClipboard = (value: string) => {
    navigator.clipboard.writeText(value);
    console.log(`Copied ${value} to clipboard`);

    return true; // Return true if successfully copied
};

export const useCopyNotification = () => {
    const [copied, setCopied] = useState(false);

    const copyWithNotification = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return { copied, copyWithNotification };
};


