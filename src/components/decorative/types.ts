
export type SVGVariant = 
  'circuit' | 
  'waves' | 
  'constellation' | 
  'abstract' | 
  'geometric' |
  'bubble' |
  'dots' |
  'grid';

export interface DecorativeSVGProps {
  variant?: SVGVariant;
  className?: string;
  color?: string;
  secondaryColor?: string;
  animated?: boolean;
}
