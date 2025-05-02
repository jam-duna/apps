/**
 * Fallback method to copy text to clipboard for non-secure contexts.
 */
export function fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
  
    // Prevent scrolling
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
  
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
  
    try {
      const successful = document.execCommand("copy");
      console.log("Fallback copy was", successful ? "successful" : "unsuccessful");
    } catch (err) {
      console.error("Fallback copy failed:", err);
    }
  
    document.body.removeChild(textArea);
  }
  