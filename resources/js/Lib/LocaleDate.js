import React from 'react'

const localeDate = (data) => {
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(data && data).toLocaleDateString('id-ID', dateOptions);
}

export default localeDate
