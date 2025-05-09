import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NameIdCard({ name, id }) {
  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg sm:text-xl font-sans-serif truncate max-w-full">{name}</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="flex items-center">
        <span className="text-sm font-Poppins text-muted-foreground">ID:</span>
        <span className="ml-2 text-sm font-mono bg-muted px-2 py-1 rounded truncate max-w-[200px] md:max-w-[300px] lg:max-w-full">
          {id}
        </span>
      </div>
      </CardContent>
    </Card>
  )
}
