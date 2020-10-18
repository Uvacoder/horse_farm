import React from 'react';
import { DEVuser } from '../../DevUtility/user';
const Profile = ({
  nick = DEVuser.nick,
  firstName = DEVuser.firstName,
  lastName = DEVuser.lastName,
  email = DEVuser.email,
  phone = DEVuser.phone,
}) => {
  return (
    <div className="contaniner profileContainer">
      <div className="imapgeProfile">
        <img
          className={'image-user'}
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="użytkownik"
        />
      </div>
      <div className="userProfile">
        <div>
          <p>nick:</p>
          <h2>{nick}</h2>
        </div>
        <div>
          <p>imię:</p>
          <h2>{firstName}</h2>
        </div>
        <div>
          <p>nazwisko:</p>
          <h2>{lastName}</h2>
        </div>
        <div>
          <p>email:</p>
          <h2>{email}</h2>
        </div>
        <div>
          <p>tel:</p>
          <h2>{phone}</h2>
        </div>
      </div>
      <div className="profileButtons">
        <button className="btn btn-green btn-capitalize">edycja</button>
        <button className="btn btn-green btn-capitalize">planer</button>
        <button className="btn btn-green btn-capitalize">rezerwacja</button>
      </div>
      <div className="profileButtons profileRemove">
        <button className="btn btn-red btn-capitalize">Usuń profil</button>
      </div>
    </div>
  );
};

export default Profile;