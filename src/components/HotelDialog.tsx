// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Hotel } from '@/types';
// import { Star, Heart } from 'lucide-react';
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
// import { cn } from '@/lib/utils';

// interface HotelDialogProps {
//   hotel: Hotel | null;
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   onFavorite?: (hotel: Hotel) => void;
//   isFavorite?: boolean;
// }

// export function HotelDialog({ hotel, open, onOpenChange, onFavorite, isFavorite }: HotelDialogProps) {
//   if (!hotel) return null;

//   const images = [
//     hotel.image,
//     'https://images.unsplash.com/photo-1566073771259-6a8506099945',
//     'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
//   ];

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <div className="flex items-center justify-between">
//             <DialogTitle className="text-2xl">{hotel.property.name}</DialogTitle>
//             {onFavorite && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={() => onFavorite(hotel)}
//                 className={cn(isFavorite && "text-red-500")}
//               >
//                 <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
//               </Button>
//             )}
//           </div>
//         </DialogHeader>

//         <Carousel className="w-full max-w-3xl">
//           <CarouselContent>
//             {hotel?.property.photoUrls.map((image, index) => (
//               <CarouselItem key={index}>
//                 <div className="relative h-64 md:h-96">
//                   <img
//                     src={image}
//                     alt={`${hotel.name} - Image ${index + 1}`}
//                     className="w-full h-full object-cover rounded-lg"
//                   />
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>

//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <h3 className="font-semibold mb-2">About</h3>
//             <p className="text-muted-foreground">{hotel.description}</p>
            
//             {/* <div className="mt-4">
//               <h3 className="font-semibold mb-2">Amenities</h3>
//               <div className="flex flex-wrap gap-2">
//                 {hotel.amenities.map((amenity, index) => (
//                   <Badge key={index} variant="secondary">
//                     {amenity}
//                   </Badge>
//                 ))}
//               </div>
//             </div> 
            
//           </div>
//             */}

//           {/* <div>
//             <h3 className="font-semibold mb-2">Prices</h3>
//             <div className="space-y-3">
//               {hotel.prices.map((price, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between p-3 rounded-lg bg-secondary"
//                 >
//                   <span className="font-medium">{price.platform}</span>
//                   <div className="flex items-center gap-2">
//                     <span className="text-xl font-bold">${price.price}</span>
//                     <Button size="sm">Book Now</Button>
//                   </div>
//                 </div>
//               ))}
//             </div> */}

//             {/* <div className="mt-4 p-3 rounded-lg bg-secondary/50">
//               <div className="flex items-center gap-2 mb-1">
//                 <Star className="h-5 w-5 text-yellow-400" />
//                 <span className="font-bold">{hotel.rating}</span>
//                 <span className="text-muted-foreground">
//                   ({hotel.reviews} reviews)
//                 </span>
//               </div>
//             </div> 
//           </div>
//             }
//         </div> */}
//       </DialogContent>
//     </Dialog>
//   );
// }


// new code
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Hotel } from "@/types";
import { Star, Heart } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface HotelDialogProps {
  hotel: Hotel | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFavorite?: (hotel: Hotel) => void;
  isFavorite?: boolean;
}

export function HotelDialog({
  hotel,
  open,
  onOpenChange,
  onFavorite,
  isFavorite,
}: HotelDialogProps) {
  if (!hotel) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">
              {hotel.property?.name}
            </DialogTitle>
            {onFavorite && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onFavorite(hotel)}
                className={cn(isFavorite && "text-red-500")}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isFavorite ? "currentColor" : "none"}
                />
              </Button>
            )}
          </div>
        </DialogHeader>

        <Carousel className="w-full max-w-3xl">
          <CarouselContent>
            {hotel.property?.photoUrls?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-64 md:h-96">
                  <img
                    src={image}
                    alt={`${hotel.property?.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">
              {hotel.property?.description || "No description available."}
            </p>

            {hotel.property?.amenities &&
              hotel.property.amenities.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.property.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Prices</h3>
            <div className="space-y-3">
              {hotel.property?.prices?.map((price, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary"
                >
                  <span className="font-medium">{price.platform}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold">${price.price}</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-secondary/50">
              <div className="flex items-center gap-2 mb-1">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">
                  {hotel.property?.rating || "N/A"}
                </span>
                <span className="text-muted-foreground">
                  ({hotel.property?.reviews || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
