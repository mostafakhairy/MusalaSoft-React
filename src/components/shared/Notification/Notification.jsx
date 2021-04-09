import React from 'react';
import { store } from 'react-notifications-component';

const Notification = (props) => {
  const { message, title, type } = props;
  return store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: true,
      pauseOnHover: true,
    },
  });
};
export default Notification;
