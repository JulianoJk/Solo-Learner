declare module '*.jpg';
declare module '*.png';
declare module '*.jpeg';
declare module '*.css';
declare module '*.svg' {
  const content: any;
  export default content;
}
