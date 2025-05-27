import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const planIcons = {
  "Básico": "/assets/icons/product-icons/basic.svg",
  "Profissional": "/assets/icons/product-icons/professional.svg",
  "Empresarial": "/assets/icons/product-icons/enterprise.svg",
}

interface PricingCardProps {
  title: string
  description: string
  price: string
  features: string[]
  isPopular?: boolean
  onSelect: () => void
}

export function PricingCard({
  title,
  description,
  price,
  features,
  isPopular = false,
  onSelect,
}: PricingCardProps) {
  return (
    <Card className={`relative ${isPopular ? 'featured-card' : ''}`}>
      {isPopular && (
        <>
          <div className="featured-yellow-highlight-bg" />
          <div className="featured-hard-blur-bg" />
          <div className="featured-vertical-hard-blur-bg" />
          <div className="featured-soft-blur-bg" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full featured-card-badge text-sm font-medium">
            Mais Popular
          </div>
        </>
      )}
      <CardHeader>
        <div className="flex justify-center mb-2">
          <img src={planIcons[title] || planIcons["Básico"]} alt={title + " ícone"} className="h-10 w-10" />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/mês</span>
        </div>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full secondary-button-animation"
          variant={isPopular ? "default" : "outline"}
          onClick={onSelect}
        >
          Selecionar Plano
        </Button>
      </CardFooter>
    </Card>
  )
} 