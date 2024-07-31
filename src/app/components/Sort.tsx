// components/Sort.tsx

import {User}  from './viewusertable'; 

interface SortProps {
  onSortChange: (sortField: keyof User) => void;
}

import React, { FC } from 'react';

interface SortProps {
  onSortChange: (sortField: keyof User) => void;
}

const Sort: FC<SortProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as keyof User);
  };

  return (
    <select onChange={handleSortChange}>
      <option value="name">Name</option>
      <option value="email">Email</option>
      <option value="username">Username</option>
      <option value="type">Type</option>
      <option value="status">Status</option>
    </select>
  );
};

export default Sort;
