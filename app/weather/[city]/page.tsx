import CityDetailPage from "@/components/weather/city-detail-page"

export default function CityDetail({ params }: { params: { city: string } }) {
  return <CityDetailPage city={params.city} />
}

