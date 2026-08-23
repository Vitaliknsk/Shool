type P = { className?: string };
const S = ({ className = "", children, vb = "0 0 24 24", fill = "none", sw = 1.8 }: P & { children: React.ReactNode; vb?: string; fill?: string; sw?: number }) => (
  <svg viewBox={vb} fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

export const IcWheel = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 9.4V3M4 15l5.6-1.5M20 15l-5.6-1.5" />
  </S>
);

export const IcPhone = ({ className }: P) => (
  <S className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </S>
);

export const IcWhatsApp = ({ className }: P) => (
  <S className={className} fill="currentColor">
    <path
      stroke="none"
      d="M12 2.2A9.7 9.7 0 0 0 3.6 16.8L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a7.9 7.9 0 0 1-4-1.1l-.3-.2-3 .8.8-2.9-.2-.3A7.9 7.9 0 1 1 12 19.9Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8 1-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.5-1 .1-.2 0-.4 0-.5l-.7-1.7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.9.9-1 2.2-.1 3.6a11 11 0 0 0 4.5 3.9c1.7.7 2.4.8 3.2.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2Z"
    />
  </S>
);

export const IcTelegram = ({ className }: P) => (
  <S className={className} fill="currentColor">
    <path stroke="none" d="M21.9 4.1 18.8 19c-.2 1-.8 1.3-1.7.8l-4.6-3.4-2.2 2.2c-.3.3-.5.5-.9.5l.3-4.6L18 7.3c.4-.3-.1-.5-.6-.2L7.2 13.7 2.7 12.3c-1-.3-1-1 .2-1.5l17.6-6.8c.8-.3 1.6.2 1.4 1.1Z" />
  </S>
);

export const IcVk = ({ className }: P) => (
  <S className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <path d="M6.5 9c.5 3 2 5.5 4.2 6.5V9m0 3.2c.8-.2 2-1.5 2.4-3.2m-2.4 3.2c.9.3 2.4 1.2 3 3" />
  </S>
);

export const IcCheck = ({ className }: P) => (
  <S className={className} sw={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </S>
);

export const IcCross = ({ className }: P) => (
  <S className={className}>
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />
  </S>
);

export const IcX = ({ className }: P) => (
  <S className={className}>
    <path d="M6 6l12 12M18 6L6 18" />
  </S>
);

export const IcShield = ({ className }: P) => (
  <S className={className}>
    <path d="M12 3 5 5.5v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10v-5L12 3Z" />
    <path d="m9 11.5 2.2 2.2L15.5 9" />
  </S>
);

export const IcBadge = ({ className }: P) => (
  <S className={className}>
    <path d="M12 2.8 14 4.9l2.9-.4.5 2.9 2.6 1.4-1.3 2.6 1.3 2.6-2.6 1.4-.5 2.9-2.9-.4-2 2.1-2-2.1-2.9.4-.5-2.9L3 14.4l1.3-2.6L3 9.2l2.6-1.4.5-2.9L9 4.9l3-2.1Z" />
    <path d="m9.5 11.8 1.8 1.8 3.4-3.7" />
  </S>
);

export const IcCardPercent = ({ className }: P) => (
  <S className={className}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="m10 9.5 4 5M10.8 9.3a.9.9 0 1 0 0 .01M13.4 14a.9.9 0 1 0 0 .01" />
  </S>
);

export const IcTax = ({ className }: P) => (
  <S className={className}>
    <path d="M6 3h9l3.5 3.5V21H6V3Z" />
    <path d="M9.5 8.5h4a2 2 0 0 1 0 4h-3a2 2 0 0 0 0 4h4" />
    <path d="M11.5 7v10" />
  </S>
);

export const IcSend = ({ className }: P) => (
  <S className={className}>
    <path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z" />
  </S>
);

export const IcMed = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </S>
);

export const IcBook = ({ className }: P) => (
  <S className={className}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z" />
    <path d="M4 19a2 2 0 0 1 2-2h13" />
    <path d="m10.5 7.5 4.5 3-4.5 3v-6Z" />
  </S>
);

export const IcClipboard = ({ className }: P) => (
  <S className={className}>
    <rect x="5" y="4" width="14" height="17" rx="2" />
    <path d="M9 4a3 3 0 0 1 6 0" />
    <path d="m8.7 13 2.2 2.2 4.4-4.6" />
  </S>
);

export const IcFlag = ({ className }: P) => (
  <S className={className}>
    <path d="M5 21V4" />
    <path d="M5 4h13l-2.5 4L18 12H5" />
  </S>
);

export const IcApp = ({ className }: P) => (
  <S className={className}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="m10 11 1.7 1.7L15 9.4M11 18.5h2" />
  </S>
);

export const IcChatPulse = ({ className }: P) => (
  <S className={className}>
    <path d="M21 12a8 8 0 0 1-8 8H4l1.8-3A8 8 0 1 1 21 12Z" />
    <path d="M8 12h1.6l1-2 1.8 4 1-2H16" />
  </S>
);

export const IcStopwatch = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="13.5" r="7.5" />
    <path d="M12 9.5v4l2.8 1.6M9.5 2.5h5M12 2.5V6" />
  </S>
);

export const IcSwap = ({ className }: P) => (
  <S className={className}>
    <path d="M4 8h13l-3-3M20 16H7l3 3" />
  </S>
);

export const IcPhonePlay = ({ className }: P) => (
  <S className={className}>
    <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
    <path d="m10.7 9.5 3.6 2.5-3.6 2.5v-5Z" />
  </S>
);

export const IcBus = ({ className }: P) => (
  <S className={className}>
    <path d="M5 3h14v13H5zM5 16v3m14-3v3M5 12h14" />
    <path d="M8.5 19.5v.01M15.5 19.5v.01M8 8.5h8" />
  </S>
);

export const IcPin = ({ className }: P) => (
  <S className={className}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </S>
);

export const IcMetro = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M6.5 16V8l5.5 6 5.5-6v8" />
  </S>
);

export const IcStar = ({ className }: P) => (
  <S className={className} fill="currentColor">
    <path stroke="none" d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9 2.9-6Z" />
  </S>
);

export const IcPlay = ({ className }: P) => (
  <S className={className} fill="currentColor">
    <path stroke="none" d="M8 5.5v13l11-6.5L8 5.5Z" />
  </S>
);

export const IcChevron = ({ className }: P) => (
  <S className={className}>
    <path d="m6 9 6 6 6-6" />
  </S>
);

export const IcArrow = ({ className }: P) => (
  <S className={className}>
    <path d="M4 12h16m-6-6 6 6-6 6" />
  </S>
);

export const IcScissors = ({ className }: P) => (
  <S className={className}>
    <circle cx="6" cy="6" r="2.6" />
    <circle cx="6" cy="18" r="2.6" />
    <path d="M8.3 7.5 20 19M8.3 16.5 20 5" />
  </S>
);

export const IcGift = ({ className }: P) => (
  <S className={className}>
    <rect x="4" y="9" width="16" height="4" />
    <path d="M6 13v8h12v-8M12 9v12M12 9s-4.5.2-5.5-2C5.7 5 7 3.6 8.6 4.3 10.8 5.2 12 9 12 9Zm0 0s4.5.2 5.5-2c.8-2-.5-3.4-2.1-2.7C13.2 5.2 12 9 12 9Z" />
  </S>
);

export const IcMoto = ({ className }: P) => (
  <S className={className}>
    <circle cx="5.5" cy="17" r="3" />
    <circle cx="18.5" cy="17" r="3" />
    <path d="M5.5 17 9 11h4.5l2 3H18l1-3h-3.5M13.5 11 12 7.5h3" />
  </S>
);

export const IcCar = ({ className }: P) => (
  <S className={className}>
    <path d="M4 12.5 5.5 7h13L20 12.5M4 12.5h16v5h-2.5m-11 0H4v-5Zm0 5v.01M17.5 17.5v.01" />
    <path d="M6.5 17.5h11" />
  </S>
);

export const IcRoute = ({ className }: P) => (
  <S className={className}>
    <circle cx="6" cy="19" r="2.5" />
    <circle cx="18" cy="5" r="2.5" />
    <path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5" strokeDasharray="4 3" />
  </S>
);

export const IcClock = ({ className }: P) => (
  <S className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3.5 2" />
  </S>
);

export const IcUsers = ({ className }: P) => (
  <S className={className}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3.5 3.5 0 0 1 0 5.9M17.5 14.5a6 6 0 0 1 3.5 5.5" />
  </S>
);

export const IcCalendar = ({ className }: P) => (
  <S className={className}>
    <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="m9.5 15 1.8 1.8 3.4-3.6" />
  </S>
);

export const IcGauge = ({ className }: P) => (
  <S className={className}>
    <path d="M4 17a9 9 0 1 1 16 0" />
    <path d="m12 13.5 4-4.5" />
    <path d="M12 17v.01" />
  </S>
);

export const IcSignal = ({ className }: P) => (
  <S className={className}>
    <path d="M12 20v.01M8.5 16.5a5 5 0 0 1 7 0M5.7 13.7a9 9 0 0 1 12.6 0M2.8 10.8a13 13 0 0 1 18.4 0" />
  </S>
);

export const IcBurger = ({ className }: P) => (
  <S className={className}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </S>
);

export const IcDoc = ({ className }: P) => (
  <S className={className}>
    <path d="M6 3h9l3.5 3.5V21H6V3Z" />
    <path d="M15 3v4h4M9 12h6M9 16h6" />
  </S>
);

export const IcQuote = ({ className }: P) => (
  <S className={className} fill="currentColor">
    <path stroke="none" d="M9.5 6C6.5 7.5 5 9.8 5 12.6c0 2.6 1.6 4.4 3.8 4.4 2 0 3.4-1.4 3.4-3.4 0-1.9-1.3-3.2-3.1-3.2h-.5c.3-1.4 1.2-2.6 2.7-3.5L9.5 6Zm8.7 0c-3 1.5-4.5 3.8-4.5 6.6 0 2.6 1.6 4.4 3.8 4.4 2 0 3.4-1.4 3.4-3.4 0-1.9-1.3-3.2-3.1-3.2h-.5c.3-1.4 1.2-2.6 2.7-3.5L18.2 6Z" />
  </S>
);

export const IcCookie = ({ className }: P) => (
  <S className={className}>
    <path d="M20.7 12.6A9 9 0 1 1 11.4 3.3c.5 2.4 2.3 3.6 4.3 3.6.1 2.1 1.5 3.6 3.6 3.7 0 .7.5 1.5 1.4 2Z" />
    <path d="M8.7 10.2v.01M11.5 15.5v.01M15.2 11.2v.01M10 13.2v.01" strokeWidth={2.6} />
  </S>
);
