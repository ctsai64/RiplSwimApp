import React from 'react';
import { Text, TextProps } from 'react-native';
import { Typography as TypographyStyles } from '../constants/design';

interface TypographyComponentProps extends TextProps {
  variant?: 'title' | 'heading' | 'subheading' | 'mediumText' | 'paragraph';
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyComponentProps> = ({
  variant = 'paragraph',
  style,
  children,
  ...props
}) => {
  return (
    <Text style={[TypographyStyles[variant], style]} {...props}>
      {children}
    </Text>
  );
};

export const Title: React.FC<Omit<TypographyComponentProps, 'variant'>> = (props) => (
  <Typography variant="title" {...props} />
);

export const Heading: React.FC<Omit<TypographyComponentProps, 'variant'>> = (props) => (
  <Typography variant="heading" {...props} />
);

export const Subheading: React.FC<Omit<TypographyComponentProps, 'variant'>> = (props) => (
  <Typography variant="subheading" {...props} />
);

export const MediumText: React.FC<Omit<TypographyComponentProps, 'variant'>> = (props) => (
  <Typography variant="mediumText" {...props} />
);

export const Paragraph: React.FC<Omit<TypographyComponentProps, 'variant'>> = (props) => (
  <Typography variant="paragraph" {...props} />
);

