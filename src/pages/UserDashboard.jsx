import React from 'react';
import { useParams } from 'react-router-dom';
import MySection from '../components/MyProfile/MySection';

const UserDashboard = () => {
  const { tab } = useParams(); // this gets "order", "profile", etc.

  return (
    <div>
      <MySection activeTabParam={tab} />
    </div>
  );
};

export default UserDashboard;
