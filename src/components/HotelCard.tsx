import { useState } from 'react';
import { Hotel } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Wifi, School as Pool, Utensils, DumbbellIcon, Heart, ExternalLink } from 'lucide-react';
import { HotelDialog } from './HotelDialog';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  hotel: Hotel;
  onFavorite?: (hotel: Hotel) => void;
  isFavorite?: boolean;
}

export function HotelCard({ hotel, onFavorite, isFavorite }: HotelCardProps) {
  const [showDialog, setShowDialog] = useState(false);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
      case 'free wifi':
        return <Wifi className="h-4 w-4" />;
      case 'pool':
        return <Pool className="h-4 w-4" />;
      case 'restaurant':
        return <Utensils className="h-4 w-4" />;
      case 'gym':
      case 'fitness center':
        return <DumbbellIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // const lowestPrice = Math.min(...hotel.prices.map(p => p.price));

  return (
    <>
      <Card className="w-full hover:shadow-lg transition-shadow group">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={hotel.property.photoUrls[0]}
              alt={hotel.property.name}
              className="w-full h-full object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <Badge variant="secondary" className="bg-white/90">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                {hotel.property.reviewScore}
              </Badge>
            </div>
            {onFavorite && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "absolute  top-2 left-2 bg-white/90 hover:bg-white ",
                  isFavorite ? "text-red-500" : "text-gray-500"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(hotel);
                }}
              >
                <Heart
                  className="h-5 w-5 transition-colors duration-200"
                  fill={isFavorite ? "red" : "none"}
                  stroke="currentColor"
                />
              </Button>
            )}

          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold">{hotel.property.name}</h3>
              <p className="text-sm text-muted-foreground">{hotel.property.wishlistName}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">from</div>
              {/* <div className="text-lg font-bold">${lowestPrice}</div> */}
            </div>
          </div>
{/* 
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 4).map((amenity, index) => {
              const icon = getAmenityIcon(amenity);
              return icon ? (
                <Badge key={index} variant="outline" className="gap-1">
                  {icon}
                  {amenity}
                </Badge>
              ) : null;
            })}
          </div> */}

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => setShowDialog(true)}
            >
              View Details
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <HotelDialog
        hotel={hotel}
        open={showDialog}
        onOpenChange={setShowDialog}
        onFavorite={onFavorite}
        isFavorite={isFavorite}
      />
    </>
  );
}