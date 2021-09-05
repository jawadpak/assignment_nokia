import React from 'react';
import Flag from 'national-flag-icons';
import type { flagCodeType } from 'national-flag-icons';
import i18n from "../config/i18n";

type countryFlag = {flag : string}

const CountryFlag = (props: countryFlag)=> {
  let flagCode = props.flag  as flagCodeType;
  return (
    <span  >
     <Flag flagCode={flagCode}   />  
    </span>
  )
}
export default CountryFlag;