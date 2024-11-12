import React from 'react';
import { Button as PaperButton, ButtonProps } from 'react-native-paper';

const Button = ({ children, ...props }: ButtonProps) => {
  return <PaperButton {...props}>{children}</PaperButton>;
};

export default Button;
