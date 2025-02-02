interface TimerProps {
  timeRemaining: number
}

export default function Timer({ timeRemaining }: TimerProps) {
  const minutes = Math.floor(timeRemaining / 60)
  const seconds = timeRemaining % 60

  return (
    <div className="text-lg font-semibold">
      ⏳
      <span className="text-xl font-bold tracking-wide">
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  )
}

