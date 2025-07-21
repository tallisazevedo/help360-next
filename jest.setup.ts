import '@testing-library/jest-dom';

// Mock Next.js components used in tests
jest.mock('next/image', () => (props: any) => {
  return <img {...props} />;
});

jest.mock('next/link', () => {
  return ({ children, href }: any) => <a href={href}>{children}</a>;
});
