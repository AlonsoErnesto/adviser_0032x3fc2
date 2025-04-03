export default function PhotoCard({ photo }: { photo: any }) {
  return (
    <div className="overflow-hidden rounded-lg">
      <img
        src={photo.url}
        alt={`Foto ${photo.id}`}
        className="aspect-square w-full object-cover"
      />
    </div>
  )
}
