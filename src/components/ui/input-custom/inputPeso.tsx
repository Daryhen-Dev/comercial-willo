import React from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HighContrastInputProps {
    field: any;
    label: string;
    unit?: string;
    textColor: string;
    disabled?: boolean;
    className?: string; // Allow custom classes
}

export const InputPeso = ({ field, label, unit, textColor, disabled = true, className }: HighContrastInputProps) => {
    return (
        <FormItem >
            <div className="flex justify-between items-end px-1">
                <FormLabel className="text-secondary-foreground text-lg lg:text-4xl font-bold uppercase">{label}</FormLabel>
                {unit && <span className="text-secondary-foreground text-lg lg:text-4xl font-bold uppercase">{unit}</span>}
            </div>
            <FormControl>
                <div className="relative">
                    <Input
                        {...field}
                        disabled={disabled}
                        className={cn(
                            "w-full h-20 md:h-28 font-bold text-2xl md:text-8xl text-right border-4 border-border rounded-sm disabled:opacity-100 disabled:cursor-default",
                            textColor,
                            className
                        )}
                    />
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
