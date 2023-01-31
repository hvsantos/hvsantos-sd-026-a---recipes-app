import React from 'react';
import usePageName from '../hooks/usePageName';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const pageName = usePageName();
  return (
    <div>
      <Header pageName={ pageName } />
      Profile
      <Footer />
    </div>
  );
}

export default Profile;
