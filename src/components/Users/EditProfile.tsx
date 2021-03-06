import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import EditProfileFormik from '../Formik/EditProfileFormik';
import { PulseLoader } from 'react-spinners';
import { RootState } from '../../redux/store';
import { IUserEditProfile, IUser } from '../../models/users';
import { NoUserData } from './NoUserData';
import { seveEditedUserDataAction } from '../../redux/actions/userActions';


const returnUserEditProfielOrUdefined = (user: Partial<IUser>): IUserEditProfile | undefined => {
  if (user.uid && user.id && user.providerId && user.email) {
    const userEditProfile: IUserEditProfile = {
      uid: user.uid,
      id: user.id,
      providerId: user.providerId,
      email: user.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      nick: user?.nick,
      opinion: user?.opinion,
      phone: user?.phone
    }
    return userEditProfile
  } else {
    return undefined
  }
}

interface EditProfileProps {
  logoutAfterTime(timeInMilesecond: number): void,
  logoutUserHandle(): void
}

const EditProfile: React.FC<EditProfileProps> = ({ logoutAfterTime, logoutUserHandle }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userAuth = useSelector((state: RootState) => state.userAction);

  const { user, isLoading, isError } = userAuth;
  const [wasDataSend, setWasDataSend] = useState(false);

  const userEditProfile = returnUserEditProfielOrUdefined(user)

  const handleSubmit = (values: IUserEditProfile) => {
    dispatch(seveEditedUserDataAction(values, user));
  };
  useEffect(() => {
    if (isLoading && !wasDataSend) {
      setWasDataSend((prev) => {
        return !prev;
      });
    }
    !isLoading && !isError && wasDataSend && history.push('profil');
    return () => {
      setWasDataSend((prev) => {
        return !prev;
      });
    };
  }, [isLoading, isError, wasDataSend]);

  return (
    <div
      className="contaniner profileContainer editProfileContainer"
      data-testid='editProfileUser'>
      <div
        className="imageProfile"
        data-testid='editImageProfile'>
        {userEditProfile && user && user.photoId && (
          <img
            className="image-user imageEditProfile"
            src={user.photoId}
            alt="u??ytkownik"
            data-testid='imageProfile'
          />
        )}
        {userEditProfile && (
          <div
            className="profileButtons profileButtonPhoto">
            <button
              className="btn btn-green btn-capitalize 
            btn-editProfile"
              data-testid='editImageButtonProfile'
            >
              {user && user.photoId && 'Zmie?? zdj??cie'}
              {(!user || !user.photoId) && 'Dodaj zdj??cie'}
            </button>
          </div>
        )
        }
      </div>
      {isLoading && <PulseLoader size={35} color={'hsla(94, 30%, 43%, 1)'} />}
      {!isLoading && !isError && userEditProfile !== undefined && <EditProfileFormik user={userEditProfile} handleSubmit={handleSubmit} />}
      {!isLoading && !isError && userEditProfile === undefined && <NoUserData confirmAction={logoutUserHandle} logoutAfterTime={logoutAfterTime} />}
    </div>
  );
};

export default EditProfile;
