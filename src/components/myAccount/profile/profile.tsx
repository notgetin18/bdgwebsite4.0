import ProfileImage from './profileImage';
import EditProfile from './editProfile';
import ProfileInfo from './profileInfo';
import { useState } from 'react';

const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditDetailsClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className="coins_background rounded-lg w-full">
        <ProfileImage />

        {isEditing ? (
          // Render the EditProfile component when isEditing is true
          <EditProfile onCancel={handleCancelEdit} />
        ) : (
          // Render the ProfileInfo component when isEditing is false
          <ProfileInfo />
        )}
        <div className='border-2 border-yellow-400 rounded mb-4 text-center'>
          <button className='text-yellow-400 px-14 py-2 ' onClick={handleEditDetailsClick}>
            Edit Details
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
