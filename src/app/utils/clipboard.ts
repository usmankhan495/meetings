import copy from 'clipboard-copy';
import { toast } from 'react-toastify';

export const copyToClipboard = async (text: string) => {
  try {
    await copy(text);
    toast('URL copied to clipboard:');
  } catch (err) {
    toast('Error copying text to clipboard');
    // console.error('Err    or copying text to clipboard:', err);
  }
};
