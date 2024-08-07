'use client';

import React from 'react';
import NotificationForm from '../../../../components/notifications/NotificationForm';
import { useParams } from 'next/navigation';

const EditNotificationPage: React.FC = () => {
  const params = useParams();
  const { id } = params;

  // Ensure id is a string
  const notificationId = Array.isArray(id) ? id[0] : id;

  return <NotificationForm key={notificationId} id={notificationId} />;
};

export default EditNotificationPage;