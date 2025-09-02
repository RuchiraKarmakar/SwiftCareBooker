import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Doctor } from "@shared/schema";

interface DoctorCardProps {
  doctor: Doctor;
  showBookButton?: boolean;
}

export default function DoctorCard({ doctor, showBookButton = true }: DoctorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow" data-testid={`doctor-card-${doctor.id}`}>
      <CardContent className="p-6 text-center">
        <img 
          src={doctor.imageUrl} 
          alt={doctor.name} 
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          data-testid={`doctor-image-${doctor.id}`}
        />
        <h3 className="text-xl font-semibold mb-2" data-testid={`doctor-name-${doctor.id}`}>
          {doctor.name}
        </h3>
        <p className="text-primary font-medium mb-2" data-testid={`doctor-specialization-${doctor.id}`}>
          {doctor.specialization}
        </p>
        <div className="flex items-center justify-center mb-3">
          <div className="flex text-yellow-400 mr-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className="h-4 w-4 fill-current" 
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground" data-testid={`doctor-rating-${doctor.id}`}>
            {doctor.rating} ({doctor.reviewCount} reviews)
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-4" data-testid={`doctor-experience-${doctor.id}`}>
          {doctor.experience} years experience
        </p>
        {showBookButton && (
          <Link href={`/doctor/${doctor.id}`}>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium" data-testid={`button-view-profile-${doctor.id}`}>
              View Profile
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
