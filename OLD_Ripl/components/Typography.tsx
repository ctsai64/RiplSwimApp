import React from 'react';
import { Text, TextProps } from 'react-native';
import { TypographyScale } from '../constants/design';
import { useTheme } from '../context/ThemeContext';

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
  const { colors } = useTheme();
  const variantStyle = TypographyScale[variant];

  return (
    <Text style={[variantStyle, { color: colors.text }, style]} {...props}>
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

