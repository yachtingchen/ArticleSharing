const isMobile = typeof window.orientation !== 'undefined';

export default () => {
  return isMobile;
};