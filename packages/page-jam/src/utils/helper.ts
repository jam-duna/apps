// [object Object]
// SPDX-License-Identifier: Apache-2.0

export function truncateHash (hash: string, mode: string): string {
  const clean = hash.startsWith('0x') ? hash.slice(2) : hash;

  if (clean.length <= 16) {
    return '0x' + clean;
  }

  const prefix = clean.slice(0, 6);
  const suffix = clean.slice(-6);

  if (mode === 'long') {
    return `0x${prefix}...${suffix}`;
  } else if (mode === 'short') {
    return `0x${prefix}...`;
  } else if (mode === 'solong') {
    return '0x' + clean.slice(0, 16) + '...';
  }

  return '';
}

export function getRelativeTime (timestamp: number, now = Date.now()): string {
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 0) {
    return '0 sec';
  }

  if (secondsAgo < 60) {
    return `${secondsAgo} ${pluralize('sec', secondsAgo)}`;
  }

  if (secondsAgo < 3600) {
    const minutes = Math.floor(secondsAgo / 60);

    return `${minutes} ${pluralize('min', minutes)}`;
  }

  if (secondsAgo < 86400) {
    const hours = Math.floor(secondsAgo / 3600);

    return `${hours} ${pluralize('hour', hours)}`;
  }

  const days = Math.floor(secondsAgo / 86400);

  return `${days} ${pluralize('day', days)}`;
}

export function pluralize (word: string, count: number): string {
  return count !== 1 ? word + 's' : word;
}

export function formatDate (timestamp: number, type?: string) {
  if (type === 'long') {
    return new Date(timestamp)
      .toLocaleString('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
      .replace(',', '');
  }

  const date = new Date(timestamp); // Create a Date object (multiply by 1000 for seconds to milliseconds)

  const hours = date.getUTCHours(); // Get hours (UTC)
  const minutes = date.getUTCMinutes(); // Get minutes (UTC)
  const seconds = date.getUTCSeconds(); // Get seconds (UTC)

  // Pad hours, minutes, and seconds with leading zeros if needed
  const formattedTime = [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');

  return formattedTime;
}
