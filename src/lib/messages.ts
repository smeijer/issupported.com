interface Messages {
  heading: string;
  message: string;
  message_embed: string;
  button: string;
}

interface Translation {
  unsupported: Messages;
  supported: Messages;
}

export const en: Translation = {
  unsupported: {
    heading: 'Please update your browser',
    message:
      'You might want to update to a newer version, or try alternatives.',
    message_embed:
      'We no longer support this browser. Update it to get the best experience and enjoy our latest features.',
    button: 'Remind Me Later',
  },

  supported: {
    heading: `You're awesome!`,
    message:
      'Your browser is up-to-date, and should be supported by most websites.',
    message_embed:
      'Your browser is up-to-date, which means you can use our latest features. Enjoy!',
    button: 'Enjoy',
  },
};
