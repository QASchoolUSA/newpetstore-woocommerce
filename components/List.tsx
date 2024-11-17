import { ReactNode } from 'react';

export const List = ({ children }: { children: ReactNode }) => {
  return <ul className="list-disc pl-5 space-y-2">{children}</ul>;
};

export const ListItem = ({ children }: { children: ReactNode }) => {
  return <li className="text-gray-800">{children}</li>;
};