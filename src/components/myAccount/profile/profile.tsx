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

  const handleSaveDetails = () => {
    // Handle save logic here
    setIsEditing(false); // Set isEditing to false after saving
  };

  return (
    <>
      <div className="coins_background rounded-lg w-full">
        <ProfileImage />

        {isEditing ? (
          <EditProfile onSaveDetails={handleSaveDetails} onCancel={handleCancelEdit} />
        ) : (
          <ProfileInfo onEditDetailsClick={handleEditDetailsClick} />
        )}
      </div>
    </>
  );
};

export default ProfileTab;
