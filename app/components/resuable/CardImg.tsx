import { Card as UICard, CardContent, CardHeader } from "../ui/Card";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "react-router";

type CardProps = ComponentProps<typeof UICard>;

type Props = {
  children: ReactNode;
  href: string;
  image: string;
  title?: string;
  category?: string;
  date?: string;
} & CardProps;

const CardImg = ({
  children,
  image,
  href,
  title,
  category,
  date,
  ...cardProps
}: Props) => {
  return (
    <Link to={href}>
      <UICard {...cardProps} className="h-max flex">
        <CardHeader>
          <img className="w-full aspect-3/2 rounded-2xl" src={image} />
        </CardHeader>
        <CardContent>
          {title && <h3 className="font-semibold mb-2 text-lg">{title}</h3>}
          {(date || category) && (
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              {date && <span>{date}</span>}
              {category && (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                  {category}
                </span>
              )}
            </div>
          )}
          {children}
        </CardContent>
      </UICard>
    </Link>
  );
};

export default CardImg;
