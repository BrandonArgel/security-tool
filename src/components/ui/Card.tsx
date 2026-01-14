import { ComponentPropsWithRef, ElementType, HTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib'

const cardVariants = cva('rounded-xl border transition-all duration-300', {
  variants: {
    variant: {
      default: 'bg-surface border-border-subtle',
      secondary: 'bg-surface-hover border-border',
      glass: 'bg-surface/50 backdrop-blur-md border-white/10 dark:bg-white/5',
      outline: 'bg-transparent border-border',
      ghost: 'bg-transparent border-transparent'
    },
    padding: {
      none: 'p-0',
      xs: 'p-2',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8'
    },
    shadow: {
      none: 'shadow-none',
      sm: 'shadow-sm',
      md: 'shadow-md',
      xl: 'shadow-2xl'
    },
    disabled: {
      true: 'opacity-40 grayscale-[0.5] pointer-events-none select-none scale-[0.98]',
      false: 'opacity-100 grayscale-0'
    }
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
    shadow: 'none'
  }
})

// Definimos los tipos de forma dinámica
interface CardBaseProps<T extends ElementType> {
  as?: T
  disabled?: boolean
}

type CardProps<T extends ElementType> = CardBaseProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof CardBaseProps<T> | keyof VariantProps<typeof cardVariants>> &
  VariantProps<typeof cardVariants>

export const Card = <T extends ElementType = 'div'>({
  className,
  variant,
  padding,
  shadow,
  as,
  ref,
  disabled,
  ...props
}: CardProps<T>) => {
  const Component = as || 'div'

  return (
    <Component ref={ref} className={cn(cardVariants({ variant, padding, shadow, disabled, className }))} {...props} />
  )
}

export const CardHeader = ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mb-6', className)}>{children}</div>
)

export const CardContent = ({ children, className }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('space-y-6', className)}>{children}</div>
)
