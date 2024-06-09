import './VisitingCard.css';
import React from 'react';

function VisitingCard({
  firstname = '',
  position = '',
  slogan = '',
  mobilePhone = '',
  fixedPhone = '',
  email = '',
  address1 = '',
  address2 = '',
  zipCode = '',
  city = '',
  company = '',
  website = '',
  rsac = '',
  siret = '',
  lastname = '',
  id = '',
}) {
  return (
    <div className='visiting-card-container'>
      <p>{firstname}</p>
      <p>{position}</p>
      <p>{slogan}</p>
      <p>{mobilePhone}</p>
      <p>{fixedPhone}</p>
      <p>{email}</p>
      <p>{address1}</p>
      <p>{address2}</p>
      <p>{zipCode}</p>
      <p>{city}</p>
      <p>{company}</p>
      <p>{website}</p>
      <p>{rsac}</p>
      <p>{siret}</p>
      <p>{lastname}</p>
      <p>{id}</p>
    </div>
  );
}

export default VisitingCard;
