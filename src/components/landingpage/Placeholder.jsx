import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
function Placeholder({id,title,data}) {
  return (
    <section id={id} className="w-full py-16 md:py-24 lg:py-32 border-t">
    <div className="container mx-auto px-4 md:px-6 text-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item,index) => (
          <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-6 w-6 font-Poppins" />
                {item.feature}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
  )
}

export default Placeholder
