import React from 'react';
import usePageName from '../hooks/usePageName';
import Header from '../components/Header';

function Profile() {
  const pageName = usePageName();
  return (
    <div>
      <Header pageName={ pageName } />
      Profile
    </div>
  );
}

export default Profile;
