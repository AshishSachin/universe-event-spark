
export type SVGVariant = 
  'circuit' | 
  'waves' | 
  'constellation' | 
  'abstract' | 
  'geometric';

export interface DecorativeSVGProps {
  variant?: SVGVariant;
  className?: string;
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
}
