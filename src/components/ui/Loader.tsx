import { LoaderCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib'

const loaderVariants = cva('animate-spin text-current', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      icon: 'h-10 w-10'
    }
  },
  defaultVariants: {
    size: 'sm'
  }
})

export interface LoaderProps extends VariantProps<typeof loaderVariants> {
  className?: string
}

export function Loader({ size, className }: LoaderProps) {
  return <LoaderCircle className={cn(loaderVariants({ size, className }))} />
}
