/**
 * Helper to construct a clean, valid WhatsApp URL.
 * Handles cases where whatsApp is a full URL (with query parameters) or a raw number.
 */
export function getWhatsAppLink(whatsAppStr?: string, phoneStr?: string, text?: string): string {
  let extractedNum = "";

  // 1. Try to extract digits from whatsApp link or text
  if (whatsAppStr) {
    const waMatch = whatsAppStr.match(/(?:wa\.me\/|phone=)([0-9]+)/);
    if (waMatch) {
      extractedNum = waMatch[1];
    } else if (!whatsAppStr.includes("http")) {
      extractedNum = whatsAppStr.replace(/[^0-9]/g, "");
    }
  }

  // 2. Fallback to phone number if we couldn't extract from whatsAppStr
  if (!extractedNum && phoneStr) {
    extractedNum = phoneStr.replace(/[^0-9]/g, "");
  }

  // 3. Ensure country code is prepended if it's a 10-digit number
  if (extractedNum.length === 10) {
    extractedNum = `91${extractedNum}`;
  }

  // 4. If no valid number found, fallback to the default primary number
  const finalPhone = extractedNum || "917070709661";

  // 5. Construct URL with optional predefined message
  if (text) {
    return `https://wa.me/${finalPhone}?text=${encodeURIComponent(text)}`;
  }
  
  // If the original whatsAppStr was a full URL and we didn't override text, return it as-is
  if (whatsAppStr && whatsAppStr.startsWith("http") && !text) {
    return whatsAppStr;
  }

  return `https://wa.me/${finalPhone}`;
}

/**
 * Extracts just the raw clean phone number digits for API usage or direct messaging.
 */
export function getWhatsAppNumber(whatsAppStr?: string, phoneStr?: string): string {
  let extractedNum = "";

  if (whatsAppStr) {
    const waMatch = whatsAppStr.match(/(?:wa\.me\/|phone=)([0-9]+)/);
    if (waMatch) {
      extractedNum = waMatch[1];
    } else if (!whatsAppStr.includes("http")) {
      extractedNum = whatsAppStr.replace(/[^0-9]/g, "");
    }
  }

  if (!extractedNum && phoneStr) {
    extractedNum = phoneStr.replace(/[^0-9]/g, "");
  }

  if (extractedNum.length === 10) {
    extractedNum = `91${extractedNum}`;
  }

  return extractedNum || "917070709661";
}
