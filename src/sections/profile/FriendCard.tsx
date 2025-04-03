import { Button } from '@/components/ui/button'

export default function FriendCard({ friend }: { friend: any }) {
  return (
    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
      <div className="overflow-hidden rounded-lg">
        <img
          src={friend.avatar}
          alt={friend.name}
          className="aspect-square w-full object-cover"
        />
      </div>
      <div className="mt-2 text-center">
        <p className="font-medium dark:text-white">{friend.name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {friend.mutualFriends} amigos en común
        </p>
        <Button variant="outline" size="sm" className="mt-2 w-full">
          Enviar mensaje
        </Button>
      </div>
    </div>
  )
}
