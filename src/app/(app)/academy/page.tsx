import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/data";

export default function AcademyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl font-bold text-primary">e-Judiciary Academy</h1>
        <p className="text-muted-foreground">
          Enhance your legal knowledge with our curated courses and simulations.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <Card key={course.id} className="flex flex-col">
            <CardHeader className="p-0">
                <div className="relative aspect-[3/2] w-full">
                    <Image
                        src={course.imageUrl}
                        alt={course.title}
                        fill
                        className="object-cover rounded-t-lg"
                        data-ai-hint={course.imageUrl.includes('mediation') ? 'handshake meeting' : 'law books'}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-6 flex-1">
              <CardTitle className="font-headline text-xl mb-2">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{course.modules} Modules</p>
              <Button>Enroll Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
