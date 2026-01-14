import { ComponentPropsWithRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '@/lib'
import { Loader } from './Loader'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none relative cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/20',
        success: 'bg-security-safe text-white hover:opacity-90 shadow-lg shadow-security-safe/20',
        ghost: 'bg-transparent hover:bg-surface-hover text-text-muted hover:text-foreground',
        nav: 'text-foreground hover:text-primary',
        outline: 'border border-border text-foreground hover:bg-surface-hover'
      },
      size: {
        sm: 'px-2 py-1 text-sm gap-1',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-6 py-3 text-base gap-3',
        icon: 'p-2'
      }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
)

interface ButtonProps extends ComponentPropsWithRef<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

export const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} disabled={isLoading || disabled} {...props}>
      <Slottable>{children}</Slottable>
      {isLoading && <Loader size="sm" />}
    </Comp>
  )
}
