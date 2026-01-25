import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { TrendingUp } from 'lucide-react'
import { Separator } from '../ui/separator'

export const CardReport = () => {
    return (
        <Card className="mx-auto max-w-sm max-h-72">
            <CardHeader>
                <CardTitle className='flex justify-between items-center'>
                    <span>Reporte entrada</span>
                    <Badge variant="secondary" className='p-2 flex justify-between items-center'><TrendingUp /> Entrada</Badge></CardTitle>
                <CardDescription>
                    This card uses the small size variant.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>
                    The card component supports a size prop that can be set to
                    &quot;sm&quot; for a more compact appearance.
                </p>
            </CardContent>
            <Separator />
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                    Action
                </Button>
            </CardFooter>
        </Card>
    )
}
